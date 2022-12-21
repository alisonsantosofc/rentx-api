import { parse as csvParse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    const strem = fs.createReadStream(file.path);

    const parseFile = csvParse();

    strem.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
