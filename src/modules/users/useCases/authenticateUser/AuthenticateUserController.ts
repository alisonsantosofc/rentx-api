import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const userToken = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(200).json(userToken);
    } catch {
      return response
        .status(400)
        .json({ error: "Email or password incorret." });
    }
  }
}

export { AuthenticateUserController };
