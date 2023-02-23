import { Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getPostgresDS } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getPostgresDS().getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openRentalByCar = await this.repository.findOne({
      where: {
        car_id,
      },
    });

    return openRentalByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({
      where: {
        user_id,
      },
    });

    return openRentalByUser;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
