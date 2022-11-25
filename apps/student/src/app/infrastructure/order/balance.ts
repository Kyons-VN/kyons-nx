import IBalance from "@domain/order/i-balance";
import { formatedPrice } from "../../utils/formats";

export default class Balance implements IBalance {
  value: number;
  formatedValue: string;
  constructor(value: number) {
    this.value = value;
    this.formatedValue = formatedPrice(this.value);
  }
  static empty() { return new Balance(0); }
}
