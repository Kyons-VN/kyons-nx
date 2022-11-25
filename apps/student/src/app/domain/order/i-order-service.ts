import { Observable } from "rxjs/internal/Observable";
import IBalance from "./i-balance";
import IInventory from "./i-inventory";

interface IOrderServicce {
  getInventories: () => Observable<IInventory>;
  getBalance: () => Observable<IBalance>;
}

export default IOrderServicce;
