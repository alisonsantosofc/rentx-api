import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryMock implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalOpenToCar = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rentalOpenToCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalOpenToUser = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rentalOpenToUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }
}

export { RentalsRepositoryMock };
