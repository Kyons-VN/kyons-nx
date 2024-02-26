import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import player from 'lottie-web/build/player/lottie_light';
import { provideLottieOptions } from 'ngx-lottie';
import { routes } from '../view/routes';

export function playerFactory() {
  return player;
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(routes),
    provideHttpClient(),
    provideLottieOptions({ player: playerFactory }),
  ],
};
