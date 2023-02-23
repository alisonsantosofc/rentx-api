import { Repository } from "typeorm";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { postgresDataSource } from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = postgresDataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rental;
  }
}

export { RentalsRepository };
