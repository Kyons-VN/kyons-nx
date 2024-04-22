import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeStore = signal(this.getTheme());
  setTheme(theme: string) {
    this.themeStore.set(theme);
    window.localStorage.setItem('theme', theme);
  }
  // constructor() {
  //   this.themeStore.update(theme => {
  //     console.log('theme', theme);

  //     window.localStorage.setItem('theme', theme);
  //     return theme;
  //   });
  // }

  getTheme() {
    return window.localStorage.getItem('theme') ?? 'universe';
  }
}
