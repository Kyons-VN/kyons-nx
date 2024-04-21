import { Discount } from '@data/order/package';

interface IPackage {
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
}

enum DiscountType {
  amount = 'amount',
  percentage = 'percentage',
}
interface IDiscount {
  type: DiscountType;
  amount: number;
}

export { DiscountType, IDiscount, IPackage };

