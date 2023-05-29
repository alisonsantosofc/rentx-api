import dayjs from "dayjs";

import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { RentalsRepositoryMock } from "@modules/rentals/repositories/mock/RentalsRepositoryMock";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryMock: RentalsRepositoryMock;
let carsRepositoryMock: CarsRepositoryMock;
let dayjsDateProvider: DayjsDateProvider;

const todayAfter24Hours = dayjs().add(1, "day").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryMock = new RentalsRepositoryMock();
    carsRepositoryMock = new CarsRepositoryMock();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMock,
      carsRepositoryMock,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryMock.create({
      name: "Car",
      description: "Description car.",
      brand: "Car Brand",
      daily_rate: 100,
      license_plate: "ABC-0001",
      fine_amount: 60,
      category_id: "categoryId",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "user_id1",
      expected_return_date: todayAfter24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there is another open to the same car", async () => {
    await rentalsRepositoryMock.create({
      car_id: "car_id1",
      user_id: "user_id1",
      expected_return_date: todayAfter24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id2",
        expected_return_date: todayAfter24Hours,
      })
    ).rejects.toEqual(new AppError("Car is rented."));
  });

  it("should not be able to create a rental if there is another open to the same user", async () => {
    await rentalsRepositoryMock.create({
      car_id: "car_id1",
      user_id: "user_id1",
      expected_return_date: todayAfter24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "car_id2",
        user_id: "user_id1",
        expected_return_date: todayAfter24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user."));
  });

  it("should not be able to create a rental with invalid return date", async () => {
    const todayAfter23Hours = dayjs().add(23, "hours").toDate();

    await expect(
      createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id1",
        expected_return_date: todayAfter23Hours,
      })
    ).rejects.toEqual(new AppError("Invalid return date."));
  });
});
