import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("shold be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    expect(car).toHaveProperty("id");
  });

  it("shold not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description car.",
        brand: "Car Brand",
        daily_rate: 100,
        license_plate: "ABC-0001",
        fine_amount: 60,
        category_id: "categoryId",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description car.",
        brand: "Car Brand",
        daily_rate: 200,
        license_plate: "ABC-0001",
        fine_amount: 80,
        category_id: "categoryId",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    expect(car.available).toBe(true);
  });
});
