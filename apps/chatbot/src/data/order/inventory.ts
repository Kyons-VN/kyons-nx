import IInventory from "@domain/order/i-inventory";
import pick from "lodash-es/pick";

export default class Inventory implements IInventory {
  mockTest: number;
  subscription: number;
  constructor({ mockTest, subscription }: { mockTest: number, subscription: number }) {
    this.mockTest = mockTest;
    this.subscription = subscription;
  }

  static empty() { return new Inventory({ mockTest: 0, subscription: 0 }); }

  static fromJson(dataObject: any): Inventory {
    const _ = pick(dataObject, ['mock_test', 'mockTest', 'subscription']);
    _.mockTest = _.mock_test;
    return new Inventory(_);
  }

  private toTime(totalhours: number) {
    const days = Math.floor(totalhours / 24);
    const hours = totalhours % 24;
    const roundedHours = Math.floor(hours);
    const minutes = Math.floor((hours - roundedHours) * 60);
    if (totalhours == 0) return '0 phút';
    return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${minutes > 0 ? ` ${minutes} phút` : ''}`;
  }

  getTime() {
    return this.toTime(this.subscription);
  }
}
