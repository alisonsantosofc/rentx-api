import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryMock implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    available,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      available: available === false ? available : true,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true);

    if (name) {
      cars = cars.filter((car) => car.name === name);
    }

    if (brand) {
      cars = cars.filter((car) => car.brand === brand);
    }

    if (category_id) {
      cars = cars.filter((car) => car.category_id === category_id);
    }

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryMock };
