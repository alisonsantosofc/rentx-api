import { Request, Response } from "express";

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    console.log("Create a new controller class.");

    return res.send();
  }
}

export { CreateRentalController };
