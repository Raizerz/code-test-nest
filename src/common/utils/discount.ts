const MONTH_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;
const DISCOUNT_AMOUNT = 0.2;

export class DiscountUtil {
  static getDiscount(firstRegistrationDate: Date): number | null {
    const dateInterval = Date.now() - new Date(firstRegistrationDate).getTime();

    return dateInterval >= MONTH_MILLISECONDS * 12 && dateInterval <= MONTH_MILLISECONDS * 18
      ? DISCOUNT_AMOUNT
      : null;
  }
}