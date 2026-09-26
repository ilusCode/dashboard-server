import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url.startsWith('http')
        ? req.url
        : environment.api.catalogApp+`${req.url}`;
  return next(req.clone({ url }));
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(withInterceptors([baseUrlInterceptor]))
  ]
};
