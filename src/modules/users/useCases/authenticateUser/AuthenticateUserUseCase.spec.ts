import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "../../repositories/mock/UsersRepositoryMock";
import { UsersTokensRepositoryMock } from "../../repositories/mock/UsersTokensRepositoryMock";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    dateProvider = new DayjsDateProvider();

    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "johndoe1",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate a user that does not exist", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "nonexistent-user@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "johndoe1",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorretPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect."));
  });
});
