import { Observable } from 'rxjs/internal/Observable';
import IBalance from './i-balance';
import { IInventory } from './i-inventory';

export default interface IOrderServicce {
  getInventory: () => Observable<IInventory>;
  getBalance: () => Observable<IBalance>;
}
