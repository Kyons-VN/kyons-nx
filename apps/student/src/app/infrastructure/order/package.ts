import pick from "lodash-es/pick";
import { formatedPrice } from "../../utils/formats";

class Package {
  id: string;
  name: string;
  description: string;
  discount: Discount;
  limit: number;
  price: number;
  formatedSalePrice: string;
  salePrice: number;
  formatedPrice: string;
  items: PackageItem[];

  constructor({ id, name, description, discount, limit, items, price, salePrice }: { id: string, name: string, description: string, discount: Discount, limit: number, items: PackageItem[], price: number, salePrice: number }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.discount = discount;
    this.limit = limit;
    this.items = items;
    this.price = price;
    this.formatedPrice = formatedPrice(this.price);
    this.salePrice = salePrice;
    this.formatedSalePrice = formatedPrice(this.salePrice);
  }

  static fromJson(dataObject: any): Package {
    const _ = pick(dataObject, ['id', 'name', 'description', 'discount', 'limit', 'items', 'price', 'salePrice']);
    _.discount = Discount.fromJson(dataObject);
    _.price = parseInt(_.price);
    _.limit = dataObject['limit'] ?? 99;
    _.salePrice = parseInt(dataObject['sale_price']);
    _.items = dataObject['package_items'].map((itemObject: any) => PackageItem.fromJson(itemObject));
    return new Package(_);
  }
}

enum DiscountType { amount, percentage }

class Discount {
  type: DiscountType;
  amount: number;
  constructor({ type, amount }: { type: DiscountType, amount: number }) {
    this.type = type;
    this.amount = amount;
  }
  static fromJson(dataObject: any): Discount {
    const _ = pick(dataObject, ['type', 'amount']);
    _.type = DiscountType[dataObject['discount_type']];
    _.amount = dataObject['discount_amount'];
    return new Discount(_);
  }
}

enum PackageServiceType {
  mock_test, subscription, tutor_advice
}

class PackageItem {
  id: string;
  service: PackageService;
  constructor({ id, service }: { id: string, service: PackageService }) {
    this.id = id;
    this.service = service;
  }
  static fromJson(dataObject: any): PackageItem {
    const _ = pick(dataObject, ['id', 'service']);
    _.id = String(_.id);
    _.service = PackageService.fromJson(dataObject);
    return new PackageItem(_);
  }
}

class PackageService {
  type: PackageServiceType;
  name: string;
  amount: number;
  constructor({ type, name, amount }: { type: PackageServiceType, name: string, amount: number }) {
    this.type = type;
    this.name = name;
    this.amount = amount;
  }
  static fromJson(dataObject: any): PackageService {
    const _ = pick(dataObject, ['type', 'name', 'amount']);
    _.type = PackageServiceType[dataObject['service_type']];
    _.name = dataObject['service_type_text'];
    _.amount = dataObject['service_amount'];
    return new PackageService(_);
  }
}

export { Package, PackageItem, PackageService, PackageServiceType, Discount, DiscountType };

