import { UsersRepositoryMock } from "@modules/users/repositories/mock/UsersRepositoryMock";
import { UsersTokensRepositoryMock } from "@modules/users/repositories/mock/UsersTokensRepositoryMock";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderMock } from "@shared/container/providers/MailProvider/mock/MailProviderMock";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let usersTokensRepositoryMock: UsersTokensRepositoryMock;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderMock;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    usersTokensRepositoryMock = new UsersTokensRepositoryMock();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderMock();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProvider
    );
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("shold be able to sent a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryMock.create({
      name: "Bubi Adams",
      email: "bubi@wos.sk",
      driver_license: "762655",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("bubi@wos.sk");

    expect(sendMail).toHaveBeenCalled();
  });

  it("shold not be able to send email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ca@ruvtawjoj.ug")
    ).rejects.toEqual(new AppError("User does not exists."));
  });

  it("shold be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryMock, "create");

    usersRepositoryMock.create({
      name: "Catatau Nunes",
      email: "catatau@wos.sk",
      driver_license: "872738",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("catatau@wos.sk");

    expect(generateTokenMail).toBeCalled();
  });
});
