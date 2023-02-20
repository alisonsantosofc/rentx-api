import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryMock: CarsRepositoryMock;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let car2: Car;

describe("List Cars", () => {
  beforeEach(async () => {
    carsRepositoryMock = new CarsRepositoryMock();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryMock);

    // create cars in memory before each
    await carsRepositoryMock.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    car2 = await carsRepositoryMock.create({
      name: "Car2",
      description: "Description car.",
      brand: "Car Brand2",
      daily_rate: 80,
      license_plate: "ABC-0002",
      fine_amount: 40,
      category_id: "categoryId2",
    });
  });

  it("shold be able to list all available cars", async () => {
    await carsRepositoryMock.create({
      name: "Car3",
      description: "Description car.",
      brand: "Car Brand3",
      daily_rate: 80,
      license_plate: "ABC-0003",
      fine_amount: 40,
      category_id: "categoryId3",
      available: false,
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(2);
  });

  it("shold be able to list all available cars by name", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car2]);
  });

  it("shold be able to list all available cars by brand", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car Brand2",
    });

    expect(cars).toEqual([car2]);
  });

  it("shold be able to list all available cars by category", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "categoryId2",
    });

    expect(cars).toEqual([car2]);
  });
});
