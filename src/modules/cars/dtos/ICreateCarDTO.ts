export interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  available?: boolean;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
}
