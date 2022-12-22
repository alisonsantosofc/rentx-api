import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportedCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportedCategory[]> {
    return new Promise((resolve, reject) => {
      const strem = fs.createReadStream(file.path);

      const categories: IImportedCategory[] = [];

      const parseFile = csvParse();

      strem.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);

          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
