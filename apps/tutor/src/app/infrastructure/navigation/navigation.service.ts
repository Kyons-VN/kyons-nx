import { Injectable } from '@angular/core';
import { AppPath } from '../../presentation/routes';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  paths: AppPath;
  constructor() {
    this.paths = new AppPath();
  }
}
