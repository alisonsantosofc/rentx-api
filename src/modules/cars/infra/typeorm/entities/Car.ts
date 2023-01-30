import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  available: boolean;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, (category) => category.cars)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };