import { formatCurrency, formatDate } from "@angular/common";

function formatedPrice(price: number) {
  return formatCurrency(price, 'vi', 'VND', undefined, '1.0-2');
}

function formatedDate(date: Date) {
  return formatDate(date, 'short', 'en');
}

export { formatedPrice, formatedDate };

