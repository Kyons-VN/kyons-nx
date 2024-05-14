import { IItem } from "./i-inventory";

interface IOrder {
  id: string;
  code: string;
  status: OrderStatus;
  orderSubscription: IItem;
  paidMethod: PaymentMethod;
  orderItems: IItem[];
  createdAt: Date;
  totalPrice: number;
}

enum OrderStatus {
  pending = 'pending',
  manualPaid = 'manual_paid',
  paid = 'paid',
  completed = 'completed',
  canceled = 'canceled',
  recalled = 'recalled',
}
enum PaymentMethod {
  bankTransfer = 100,
  credit = 200,
  momo = 300,
  atm = 301,
  visa = 302
}

export { IOrder, OrderStatus, PaymentMethod };

