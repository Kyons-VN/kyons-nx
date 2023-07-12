import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IOrderServicce from '@domain/order/i-order-service';
import { serverApi } from '@infrastructure/auth/interceptor';
import { DBHelper } from '@infrastructure/helper/helper';
import { catchError, map } from 'rxjs';
import Balance from './balance';
import Inventory from './inventory';
import { Package } from './package';
import { Transaction, TransactionList } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderServicce {
  constructor(private http: HttpClient) {}

  getInventories() {
    return this.http.get(`${serverApi()}/students/inventories`).pipe(
      catchError(DBHelper.handleError('GET getInventories', {})),
      map((res: any) => {
        if (res.data === undefined) return Inventory.empty();
        return Inventory.fromJson(res.data);
      })
    );
  }

  getBalance() {
    return this.http.get(`${serverApi()}/students/balance`).pipe(
      catchError(DBHelper.handleError('GET getBalance', 0)),
      map((res: any) => {
        if (res.data === undefined || typeof parseInt(res.data.balance) != 'number') return Balance.empty();
        return new Balance(parseInt(res.data.balance));
      })
    );
  }

  getTransaction() {
    return this.http.get(`${serverApi()}/students/transactions`).pipe(
      catchError(DBHelper.handleError('GET getTransaction', [])),
      map((res: any) => {
        // res = {
        //   "data": [
        //     {
        //       "id": 3,
        //       "quantity": 2,
        //       "amount": "-200000.0",
        //       "package_name": "Mock Test (special promotion)",
        //       "created_at": "2022-11-11T12:44:07.010Z"
        //     },
        //     {
        //       "id": 2,
        //       "quantity": 1,
        //       "amount": "10000000.0",
        //       "package_name": "Nạp tiền",
        //       "created_at": "2022-11-11T12:21:38.564Z"
        //     }
        //   ],
        //   "total": 3
        // };
        if (res.data === undefined || res.data.length === 0) return TransactionList.empty();
        // const collection = res.data;
        const collection = res.data;
        return new TransactionList({
          total: res.total,
          list: collection.map((dataObject: any) => Transaction.fromJson(dataObject)),
        });
      })
    );
  }

  getPackages() {
    return this.http.get<Package[]>(`${serverApi()}/students/packages`).pipe(
      catchError(DBHelper.handleError('GET getPackages', [])),
      map((res: any) => {
        if (res.data === undefined || res.data.length == 0) return [];
        return res.data.map((dataObject: any) => Package.fromJson(dataObject));
      })
    );
  }

  orderPackage(packageId: string, quantity: number) {
    const params: any = {
      id: packageId,
      quantity: quantity,
    };
    return this.http.post(`${serverApi()}/students/packages/order`, params).pipe(
      // catchError(DBHelper.handleError('POST orderPackage')),
      map((res: any) => {
        return res;
        //   if (res.success) return 'OK';
        //   return '';
      })
    );
  }

  getFreeTrial() {
    const params: any = {};
    return this.http.get(`${serverApi()}/students/gifts/request_free_subscription`);
  }
}
