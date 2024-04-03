import { IItem } from "./i-inventory";

interface IOrder {
  id: string;
  code: string;
  status: OrderStatus;
  orderSubscription: IItem;
  paidMethod: PayMethod;
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
enum PayMethod {
  transfer = 'transfer',
  credit = 'credit',
}

export { IOrder, OrderStatus, PayMethod };

