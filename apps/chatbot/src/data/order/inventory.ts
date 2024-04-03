import { IInventory, IItem, ItemType } from '@domain/order/i-inventory';
import { ISubscriptionPackage } from '@domain/order/i-subscription';
import pick from 'lodash-es/pick';
import { Discount, DiscountType, OrderSubscription, Package } from './package';

class Inventory implements IInventory {
  subscription: OrderSubscription;
  koin: any;
  items: Item[];

  constructor({ koin, subscription, items }: IInventory) {
    this.koin = koin;
    this.subscription = subscription;
    this.items = items;
  }

  static fromJson(dataObject: any): Inventory {
    const _ = pick(dataObject, ['items', 'koin', 'subscription']);
    _.items = _.items.map((item: any) => Item.fromJson(item));
    _.subscription = OrderSubscription.fromJson(_.subscription);
    return new Inventory(_);
  }

  // private toTime(totalhours: number) {
  //   const days = Math.floor(totalhours / 24);
  //   const hours = totalhours % 24;
  //   const roundedHours = Math.floor(hours);
  //   const minutes = Math.floor((hours - roundedHours) * 60);
  //   if (totalhours == 0) return '0 phút';
  //   return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${
  //     minutes > 0 ? ` ${minutes} phút` : ''
  //   }`;
  // }

  // getTime() {
  //   return this.toTime(this.subscription);
  // }
}
// "subscription": {
//   "id": 1,
//   "quantity": 0,
//   "package": {
//     "id": 0,
//     "name": "",
//     "image_url": ""
//   }
class ItemSubscription {
  id: number;
  quantity: number;
  orderPackage: SubscriptionPackage;

  constructor({ id, quantity, orderPackage }: { id: number; quantity: number; orderPackage: Package }) {
    this.id = id;
    this.quantity = quantity;
    this.orderPackage = orderPackage;
  }

  static fromJson(dataObject: any): ItemSubscription {
    const _ = pick(dataObject, ['id', 'quantity', 'package', 'orderPackage']);
    _.orderPackage = SubscriptionPackage.fromJson(_.package);
    return new ItemSubscription(_);
  }
}

class SubscriptionPackage extends Package implements ISubscriptionPackage {
  override price = 0;
  constructor({ id, name, image }: { id: string; name: string; image: string }) {
    super({
      id: id,
      name: name,
      image: image,
      price: 0,
      discount: new Discount({ type: DiscountType.amount, amount: 0 }),
      isUsing: false,
      description: '',
      level: 0,
      duration: 0,
    });
  }
  static override fromJson(dataObject: any): SubscriptionPackage {
    const _ = pick(dataObject, ['id', 'name', 'image_url', 'image']);
    return new SubscriptionPackage(_);
  }
}

class Item implements IItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  type: ItemType;
  constructor({ id, name, image, quantity, type }: { id: string; name: string; image: string; quantity: number, type: ItemType }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
    this.type = type;
  }
  static fromJson(dataObject: any): Item {
    const _ = pick(dataObject, ['id', 'name', 'image', 'image_url', 'quantity', 'item_type', 'type']);
    _.id = String(_.id);
    _.quantity = parseInt(_.quantity);
    _.image = _.image_url;
    _.type = _.item_type == 'subscription' ? ItemType.subscription : ItemType.item;
    return new Item(_);
  }
}

export { Inventory, Item, ItemSubscription, SubscriptionPackage };

