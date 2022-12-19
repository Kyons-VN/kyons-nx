import { Injectable } from '@angular/core';
import { AppPaths } from '../../presentation/routes';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  paths: AppPaths;
  constructor() {
    this.paths = new AppPaths();
  }
}
