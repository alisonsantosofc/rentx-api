import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddCarSpecificationsUseCase } from "./AddCarSpecificationsUseCase";

class AddCarSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications } = req.body;

    const addCarSpecificationsUseCase = container.resolve(
      AddCarSpecificationsUseCase
    );

    const car = await addCarSpecificationsUseCase.execute({
      car_id: id,
      specifications_id: specifications,
    });

    return res.json(car);
  }
}

export { AddCarSpecificationsController };
