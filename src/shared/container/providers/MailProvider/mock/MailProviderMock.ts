import { IMailProvider } from "../IMailProvider";

class MailProviderMock implements IMailProvider {
  private messages: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      templatePath,
    });
  }
}

export { MailProviderMock };
