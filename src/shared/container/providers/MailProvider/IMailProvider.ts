interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void>;
}

export { IMailProvider };
