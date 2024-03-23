import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from '@environments';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  // if (window.screen.width <= 768) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', '/assets/mobile-iframe.html');
  //   xhr.onload = function () {
  //     const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
  //     const html = pattern.exec(xhr.responseText);
  //     if (html) {
  //       window.document.body.innerHTML = html[1];
  //     }
  //   };
  //   xhr.send();
  //   return;
  // if (window.location.host == 'kyonsvn.web.app') window.location = 'https://kyonsvn.web.app/m';
  // if (window.location.host == 'student.kyons.vn') window.location = 'https://kyonsvn.web.app/student';
  // }
  console.log(appConfig.providers);

  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
