import { IPackage } from "./i-package";

export interface IOrderSubscription {
  id: string;
  quantity: number;
  package: IPackage;
}

// export interface ISubscriptionPackage {
//   id: string;
//   name: string;
//   image: string;
// }
