import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryMock implements ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Promise<Specification> {
    throw new Error("Method not implemented.");
  }
  findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationsRepositoryMock };
