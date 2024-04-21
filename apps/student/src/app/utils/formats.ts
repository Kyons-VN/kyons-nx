import { formatCurrency, formatDate } from '@angular/common';

function formattedPrice(price: number): string {
  return formatCurrency(price, 'vi-VN', 'đ', 'VND', '1.0-2');
}

function formattedDate(date: Date) {
  return formatDate(date, 'dd/MM/yyyy HH:mm', 'vi-VN');
}

export { formattedDate, formattedPrice };

