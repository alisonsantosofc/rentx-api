import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("shold be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Touran",
      description: "The super car deleloped for races.",
      brand: "Speed Racers",
      daily_rate: 100,
      license_plate: "RAC-0101",
      fine_amount: 60,
      category_id: "categoryId",
    });
  });
});
