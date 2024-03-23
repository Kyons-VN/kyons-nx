import { formatCurrency, formatDate } from '@angular/common';

function formattedPrice(price: number) {
  return formatCurrency(price, 'vi-VN', 'VND', undefined, '1.0-2');
}

function formatedDate(date: Date) {
  return formatDate(date, 'dd/MM/yyyy HH:mm', 'vi-VN');
}

export { formatedDate, formattedPrice };
