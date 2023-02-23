import dayjs from "dayjs";

import { RentalsRepositoryMock } from "@modules/rentals/repositories/mock/RentalsRepositoryMock";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryMock: RentalsRepositoryMock;
let dayjsDateProvider: DayjsDateProvider;

const todayAfter24Hours = dayjs().add(1, "day").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryMock = new RentalsRepositoryMock();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMock,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "car_id1",
      user_id: "user_id1",
      expected_return_date: todayAfter24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id1",
        expected_return_date: todayAfter24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id2",
        expected_return_date: todayAfter24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental if there is another open to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id1",
        expected_return_date: todayAfter24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "car_id2",
        user_id: "user_id1",
        expected_return_date: todayAfter24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid return date", () => {
    expect(async () => {
      const todayAfter23Hours = dayjs().add(23, "hours").toDate();

      await createRentalUseCase.execute({
        car_id: "car_id1",
        user_id: "user_id1",
        expected_return_date: todayAfter23Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
