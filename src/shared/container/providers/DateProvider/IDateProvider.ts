interface IDateProvider {
  dateNow(): Date;
  convertToUtc(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
