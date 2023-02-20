import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { AddCarSpecificationsUseCase } from "./AddCarSpecificationsUseCase";

let carsRepositoryMock: CarsRepositoryMock;
let addCarSpecificationsUseCase: AddCarSpecificationsUseCase;

describe("Add Car Specifications", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    addCarSpecificationsUseCase = new AddCarSpecificationsUseCase(
      carsRepositoryMock
    );
  });

  it("shold be able to add a new specification to the car", async () => {
    const car = await carsRepositoryMock.create({
      name: "Car1",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    const specifications_id = ["specification_id_1", "specification_id_2"];

    await addCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it("shold be able to add a new specification to a non-existent car", () => {
    expect(async () => {
      const car_id = "car_id";
      const specifications_id = ["specification_id_1", "specification_id_2"];

      await addCarSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
