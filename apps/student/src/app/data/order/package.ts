import { DiscountType, IDiscount, IPackage } from '@domain/order/i-package';
import { IOrderSubscription } from '@domain/order/i-subscription';
import { formattedPrice } from '@share-utils/formats';
import pick from 'lodash-es/pick';

class Package implements IPackage {
  id: string;
  name: string;
  description: string;
  discount: Discount;
  price: number;
  formatedSalePrice: string;
  salePrice: number;
  formattedPrice: string;
  isUsing: boolean;
  image: string;
  level: number;
  packageTypeDisplay: string;
  duration: number;

  constructor({
    id,
    name,
    description,
    discount,
    price,
    salePrice,
    isUsing,
    image,
    level,
    duration,
  }: {
    id: string;
    name: string;
    description: string;
    discount: Discount;
    price: number;
    salePrice: number;
    isUsing: boolean;
    image: string;
    level: number;
    duration: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.discount = discount;
    this.price = price;
    this.formattedPrice = formattedPrice(this.price);
    this.salePrice = salePrice;
    const formattedSalePrice = formattedPrice(this.salePrice);
    this.formatedSalePrice = formattedSalePrice.replace(
      formattedSalePrice.slice(formattedSalePrice.length - 2, formattedSalePrice.length - 1),
      ''
    );
    this.isUsing = isUsing;
    this.image = image;
    this.level = level;
    this.packageTypeDisplay = getPackageTypeDisplay(level);
    this.duration = duration;
  }

  static fromJson(dataObject: any): Package {
    const _ = pick(dataObject, [
      'id',
      'name',
      'image',
      'description',
      'discount_type',
      'quantity',
      'price',
      'discount_amount',
      'discount',
      'salePrice',
      'sale_price',
      'isUsing',
      'using',
      'image',
      'image_url',
      'level',
      'duration',
    ]);
    _.id = _.id.toString();
    _.image = _.image_url;
    _.discount = dataObject['discount_amount'] ? Discount.fromJson(dataObject) : new Discount({ type: DiscountType.amount, amount: 0 });
    _.price = _.price ? parseFloat(_.price) : parseFloat(dataObject['total_price']);
    _.salePrice = _.sale_price ? parseFloat(_.sale_price) : parseFloat(dataObject['total_price']);
    _.isUsing = _.using ?? false;
    _.duration = parseInt(_.quantity);
    return new Package(_);
  }
}

class Discount implements IDiscount {
  type: DiscountType;
  amount: number;
  constructor({ type, amount }: { type: DiscountType; amount: number }) {
    this.type = type;
    this.amount = amount;
  }
  static fromJson(dataObject: any): Discount {
    const _ = pick(dataObject, ['type', 'amount']);
    _.type = dataObject['discount_type'];
    _.amount = parseFloat(dataObject['discount_amount']);
    return new Discount(_);
  }
}

// class PackageSubscription implements ISubscriptionPackage {
//   id: string;
//   name: string;
//   image: string;
//   constructor({ id, name, image }: { id: string; name: string; image: string }) {
//     this.id = id;
//     this.name = name;
//     this.image = image;
//   }
//   static fromJson(dataObject: any): PackageSubscription {
//     const _ = pick(dataObject, ['id', 'name', 'image', 'image_url']);
//     _.id = String(_.id);
//     _.image = _.image_url;
//     return new PackageSubscription(_);
//   }
// }

// enum PackageServiceType {
//   mock_test,
//   subscription,
//   tutor_advice,
// }

// class PackageItem {
//   id: string;
//   service: PackageService;
//   constructor({ id, service }: { id: string; service: PackageService }) {
//     this.id = id;
//     this.service = service;
//   }
//   static fromJson(dataObject: any): PackageItem {
//     const _ = pick(dataObject, ['id', 'service']);
//     _.id = String(_.id);
//     _.service = PackageService.fromJson(dataObject);
//     return new PackageItem(_);
//   }
// }

// class PackageService {
//   type: PackageServiceType;
//   name: string;
//   amount: number;
//   constructor({ type, name, amount }: { type: PackageServiceType; name: string; amount: number }) {
//     this.type = type;
//     this.name = name;
//     this.amount = amount;
//   }
//   static fromJson(dataObject: any): PackageService {
//     const _ = pick(dataObject, ['type', 'name', 'amount']);
//     _.type = PackageServiceType[dataObject['service_type']];
//     _.name = dataObject['service_type_text'];
//     _.amount = dataObject['service_amount'];
//     return new PackageService(_);
//   }
// }

class OrderSubscription implements IOrderSubscription {
  id: string;
  quantity: number;
  package: Package;
  constructor({
    id,
    quantity,
    package: orderPackage,
  }: {
    id: string;
    quantity: number;
    package: Package;
  }) {
    this.id = id;
    this.quantity = quantity;
    this.package = orderPackage;
  }
  static fromJson(dataObject: any): OrderSubscription {
    const _ = pick(dataObject, ['id', 'quantity', 'package']);
    _.id = String(_.id);
    _.package = Package.fromJson(dataObject['package']);
    return new OrderSubscription(_);
  }
}

// function getSalePrice(price: number, discount: Discount): number {
//   if (discount.type == DiscountType.amount) return price - discount.amount;
//   if (discount.type == DiscountType.percentage) return price - price * (100 - discount.amount) / 100;
//   return price;
// }

function getPackageTypeDisplay(level: number): string {
  if (level == 0) return 'Gói cơ bản';
  if (level > 0) return 'Gói mở rộng';
  return '';
}

export { Discount, DiscountType, OrderSubscription, Package };

