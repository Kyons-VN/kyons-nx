import { IItem } from "@domain/order/i-inventory";
import { IOrder, OrderStatus, PaymentMethod } from "@domain/order/i-order";
import { formattedDate, formattedPrice } from '@share-utils/utils';
import pick from "lodash-es/pick";
import { Item } from "./inventory";
import { Package } from "./package";

export default class Order implements IOrder {
  id: string;
  code: string;
  status: OrderStatus;
  orderSubscription: Item;
  paidMethod: PaymentMethod;
  orderItems: IItem[];
  createdAt: Date;
  // updatedAt: string;
  createdAtDisplay: string;
  totalPrice: number;
  totalPriceDisplay: string;
  orderPackage: Package;
  statusDisplay: string;
  payUrl: string;
  constructor({
    id,
    code,
    status,
    orderSubscription,
    paidMethod,
    orderItems,
    createdAt,
    totalPrice,
    orderPackage,
    payUrl,
  }: {
    id: string;
    code: string;
    status: OrderStatus;
    orderSubscription: Item;
    paidMethod: PaymentMethod;
    orderItems: Item[];
    createdAt: Date;
    totalPrice: number;
    orderPackage: Package;
    payUrl: string;
  }) {
    this.id = id;
    this.code = code;
    this.status = status;
    this.orderSubscription = orderSubscription;
    this.paidMethod = paidMethod;
    this.orderItems = orderItems;
    this.createdAt = createdAt;
    this.createdAtDisplay = formattedDate(createdAt);
    this.totalPrice = totalPrice;
    this.totalPriceDisplay = formattedPrice(totalPrice);
    this.orderPackage = orderPackage;
    this.statusDisplay = getStatusDisplay(status);
    this.payUrl = payUrl;
  }

  static fromJson(dataObject: any): Order {
    const _ = pick(dataObject, ['id', 'code', 'status', 'orderSubscription', 'paidMethod', 'paid_method', 'orderItems', 'order_items', 'createdAt', 'created_at', 'totalPrice', 'total_price', 'orderPackage', 'order_package', 'payUrl', 'pay_url']);
    _.id = String(_.id);
    ({ orderSubscription: _.orderSubscription, orderItems: _.orderItems } = getOrderItems(_.order_items));
    _.totalPrice = parseFloat(_.total_price);
    _.orderItems = _.orderItems.map((orderItem: any) => Item.fromJson(orderItem));
    _.orderPackage = Package.fromJson(_.order_package);
    _.paidMethod = _.paid_method;
    _.createdAt = new Date(_.created_at);
    _.payUrl = (dataObject.payment ?? { 'pay_url': '' }).pay_url ?? '';
    return new Order(_);
  }
}

function getOrderItems(data: any[]): { orderSubscription: Item, orderItems: Item[] } {
  const subscription = Item.fromJson(data.filter((item) => item['item_type'] === 'subscription')[0]);
  const items = data.filter((item) => item['item_type'] !== 'subscription').map((item) => Item.fromJson(item));
  return {
    orderSubscription: subscription,
    orderItems: items,
  };
}
function getStatusDisplay(status: OrderStatus): string {
  return status === OrderStatus.pending ? 'Chưa thanh toán' :
    status === OrderStatus.manualPaid ? 'Đang xử lý' :
      status === OrderStatus.paid ? 'Đã thanh toán' :
        status === OrderStatus.completed ? 'Hoàn tất' :
          status === OrderStatus.canceled ? 'Đã hủy' :
            status === OrderStatus.recalled ? 'Đã thu hồi' : status === OrderStatus.paymentFailed ? 'Thanh toán thất bại' : '';
}

