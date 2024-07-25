import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import { DBHelper } from '@data/helper/helper';
import IOrderServicce from '@domain/order/i-order-service';
import { catchError, map, Observable } from 'rxjs';
import Balance from './balance';
import { Inventory } from './inventory';
import Order from './order';
import { Package } from './package';
import SubscriptionTime from './subscription';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderServicce {
  //       "amount": "10000000.0",
  //       "package_name": "Nạp tiền",
  //       "created_at": "2022-11-11T12:21:38.564Z"
  //     }
  //   ],
  //   "total": 3
  // };
  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get(`${serverApi()}/api/v2/users/inventories`).pipe(
      catchError(DBHelper.handleError('GET getInventories', {})),
      map((res: any) => {
        return Inventory.fromJson(res);
      })
    );
  }

  getBalance(): Observable<Balance> {
    return this.http.get(`${serverApi()}/api/v2/users/inventories/balance`).pipe(
      catchError(DBHelper.handleError('GET getBalance', Balance.empty())),
      map((res: any) => {
        if (res.balance === undefined || typeof parseInt(res.balance) != 'number') return Balance.empty();
        return new Balance(parseInt(res.balance));
      })
    );
  }

  getCoin(): Observable<number> {
    return this.http.get(`${serverApi()}/api/v2/users/inventories/koin`).pipe(
      catchError(DBHelper.handleError('GET getKcoin', -1)),
      map((res: any) => {
        if (res.quantity === undefined || typeof parseInt(res.quantity) != 'number') return -1;
        return Number(res.quantity);
      })
    );
  }
  // getSubscription() {
  //   return this.http.get(`${serverApi()}/api/v2/users/inventories/subscription`).pipe(
  //     catchError(DBHelper.handleError('GET getBalance', 0)),
  //     map((res: any) => {
  //       if (res.balance === undefined || typeof parseInt(res.balance) != 'number') return Balance.empty();
  //       return new Balance(parseInt(res.balance));
  //     })
  //   );
  // }

  // getTransaction() {
  //   return this.http.get(`${serverApi()}/students/transactions`).pipe(
  //     catchError(DBHelper.handleError('GET getTransaction', [])),
  //     map((res: any) => {
  //       // res = {
  //       //   "data": [
  //       //     {
  //       //       "id": 3,
  //       //       "quantity": 2,
  //       //       "amount": "-200000.0",
  //       //       "package_name": "Mock Test (special promotion)",
  //       //       "created_at": "2022-11-11T12:44:07.010Z"
  //       //     },
  //       //     {
  //       //       "id": 2,
  //       //       "quantity": 1,
  //       //       "amount": "10000000.0",
  //       //       "package_name": "Nạp tiền",
  //       //       "created_at": "2022-11-11T12:21:38.564Z"
  //       //     }
  //       //   ],
  //       //   "total": 3
  //       // };
  //       if (res.data === undefined || res.data.length === 0) return TransactionList.empty();
  //       // const collection = res.data;
  //       const collection = res.data;
  //       return new TransactionList({
  //         total: res.total,
  //         list: collection.map((dataObject: any) => Transaction.fromJson(dataObject)),
  //       });
  //     })
  //   );
  // }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${serverApi()}/api/v2/packages`).pipe(
      catchError(DBHelper.handleError('GET getPackages', [])),
      map((res: any) => {
        if (res.data === undefined || res.data.length == 0) return [];
        return res.data.map((dataObject: any) => Package.fromJson(dataObject));
      })
    );
  }

  orderPackage(packageId: string, quantity: number, payment: number, redirectUrl: string) {
    const params: any = {
      package_id: parseInt(packageId),
      quantity: quantity,
      paid_method: payment,
      redirect_url: redirectUrl,
    };
    return this.http.post(`${serverApi()}/api/v2/users/orders/new`, params).pipe(
      // catchError(DBHelper.handleError('POST orderPackage')),
      map((res: any) => {
        if (res.data === undefined || res.data.payment === undefined || res.data.payment.pay_url === undefined) return '';
        return res.data.payment.pay_url;
      })
    );
  }

  getOrderHistory() {
    return this.http.get(`${serverApi()}/api/v2/users/orders`).pipe(
      catchError(DBHelper.handleError('GET getOrderHistory', [])),
      map((res: any) => {
        if (res.data === undefined || res.data.length === 0) return [];
        return res.data.map((dataObject: any) => Order.fromJson(dataObject));
      })
    );
  }
  confirmOrder(orderCode: string) {
    const params: any = {
      order_code: orderCode,
    };
    return this.http.put(`${serverApi()}/api/v2/users/orders/confirm`, params).pipe(
      catchError(DBHelper.handleError('PUT confirmOrder')),
      map((res: any) => {
        return res;
      })
    );
  }
  cancelOrder(orderCode: string): Observable<string> {
    const params: any = {
      order_code: orderCode,
    };
    return this.http.put(`${serverApi()}/api/v2/users/orders/cancel`, params).pipe(
      catchError(DBHelper.handleError('PUT cancelOrder', 'fail')),
      map((res: any) => {
        if (res.status === undefined) return 'fail';
        return res.status;
      })
    );
  }
  getSubscriptionTime(): Observable<SubscriptionTime> {
    return this.http.get(`${serverApi()}/api/v2/users/inventories/subscription`).pipe(
      catchError(DBHelper.handleError('GET getSubscriptionTime', 0)),
      map((res: any) => {
        if (res.quantity === undefined || typeof parseInt(res.quantity) != 'number') return new SubscriptionTime(0);
        return new SubscriptionTime(res.quantity);
      })
    );
  }
}
