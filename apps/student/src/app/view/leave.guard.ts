import { Inject, Injectable, Optional } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BeforeUnloadService, BEFORE_UNLOAD_MESSAGE } from '@share-directives/before-unload';
import { Observable } from 'rxjs';

// import { BeforeUnloadService, BEFORE_UNLOAD_MESSAGE } from '@share-directives';
// import { BEFORE_UNLOAD_MESSAGE } from './beforeunload.token';

@Injectable({
  providedIn: 'root'
})
export class LeaveGuard implements CanDeactivate<any> {

  constructor(
    private service: BeforeUnloadService,
    @Optional() @Inject(BEFORE_UNLOAD_MESSAGE) private message: string,
  ) { }

  canDeactivate(
    // component: any,
    // currentRoute: ActivatedRouteSnapshot,
    // currentState: RouterStateSnapshot,
    // nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.leaveCheck(this.message);
  }
}
