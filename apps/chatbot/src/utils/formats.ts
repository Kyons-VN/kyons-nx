import { formatCurrency, formatDate } from '@angular/common';

function formattedPrice(price: number) {
  return formatCurrency(price, 'vi', 'VND', undefined, '1.0-2');
}

function formattedDate(date: Date) {
  return formatDate(date, 'dd/MM/yyyy HH:mm', 'vi');
}

export { formattedPrice, formattedDate };
