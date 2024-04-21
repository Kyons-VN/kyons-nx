import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, Provider } from '@angular/core';

registerLocaleData(localeVi, 'vi-VN');

const languageProviders: Provider[] = [
  { provide: LOCALE_ID, useValue: 'vi-VN' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' },
];

export { languageProviders };
