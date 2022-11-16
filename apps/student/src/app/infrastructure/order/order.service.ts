import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API } from '@infrastructure/auth/interceptor';
import { DBHelper } from '@infrastructure/helper/helper';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getInventories() {
    return this.http.get(SERVER_API + '/students/inventories').pipe(
      catchError(DBHelper.handleError('GET getInventories', [])),
      map((res: any) => {
        if (res.data === undefined) return {};
        return {
          "mock_test": 10,
          "tutor_advice": 0,
          "subscription": 75.5
        };
      })
    );
  }

  getBalance() {
    return this.http.get(SERVER_API + '/students/balance').pipe(
      catchError(DBHelper.handleError('GET getBalance', 0)),
      map((res: any) => {
        if (res.data === undefined) return 0;
        return 1000000;
      })
    );
  }

  getTransaction() {
    return this.http.get(SERVER_API + '/students/balance').pipe(
      catchError(DBHelper.handleError('GET getBalance', 0)),
      map((res: any) => {
        if (res.data === undefined) return 0;
        return 1000000;
      })
    );
  }
}
