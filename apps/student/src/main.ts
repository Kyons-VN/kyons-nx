import { DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  if (window.screen.width <= 768) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/mobile-iframe.html');
    xhr.onload = function () {
      const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
      const html = pattern.exec(xhr.responseText);
      if (html) {
        window.document.body.innerHTML = html[1];
      }
    };
    xhr.send();
    return;
    // if (window.location.host == 'kyonsvn.web.app') window.location = 'https://kyonsvn.web.app/m';
    // if (window.location.host == 'student.tuhoconline.org') window.location = 'https://kyonsvn.web.app/student';
  }
  platformBrowserDynamic()
    .bootstrapModule(AppModule, {
      providers: [{ provide: LOCALE_ID, useValue: 'vi-VN' }, { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' }]
    })
    .catch((err) => console.error(err));
};


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

