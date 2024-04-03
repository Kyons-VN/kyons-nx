import { IOrderSubscription } from './i-subscription';

export interface IInventory {
  koin: any;
  subscription: IOrderSubscription;
  items: IItem[];
}

export interface IItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  type: ItemType;
}

export enum ItemType {
  subscription = 'subscription',
  item = 'item',
}
