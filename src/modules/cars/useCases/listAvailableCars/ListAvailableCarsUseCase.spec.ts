import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("shold be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description car.",
      brand: "Car Brand2",
      daily_rate: 80,
      license_plate: "ABC-0002",
      fine_amount: 40,
      category_id: "categoryId2",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(2);
  });

  it("shold be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description car.",
      brand: "Car Brand2",
      daily_rate: 80,
      license_plate: "ABC-0002",
      fine_amount: 40,
      category_id: "categoryId2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars.length).toBe(2);
  });

  it("shold be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description car.",
      brand: "Car Brand2",
      daily_rate: 80,
      license_plate: "ABC-0002",
      fine_amount: 40,
      category_id: "categoryId2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car Brand2",
    });

    expect(cars.length).toBe(2);
  });

  it("shold be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Description car.",
      brand: "Car Brand2",
      daily_rate: 80,
      license_plate: "ABC-0002",
      fine_amount: 40,
      category_id: "categoryId2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "categoryId2",
    });

    expect(cars.length).toBe(2);
  });
});
