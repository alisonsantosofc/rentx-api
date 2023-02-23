interface IDateProvider {
  dateNow(): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
}

export { IDateProvider };
