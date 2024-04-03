
export interface IOrderSubscription {
  id: string;
  quantity: number;
  package: ISubscriptionPackage;
}

export interface ISubscriptionPackage {
  id: string;
  name: string;
  image: string;
}
