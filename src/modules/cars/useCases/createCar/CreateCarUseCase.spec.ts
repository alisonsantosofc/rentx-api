import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryMock: CarsRepositoryMock;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
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

  it("shold not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description car.",
        brand: "Car Brand",
        daily_rate: 200,
        license_plate: "ABC-0001",
        fine_amount: 80,
        category_id: "categoryId",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
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
