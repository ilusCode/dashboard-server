import { ApplicationConfig, inject, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { environment } from '../environments/environment';

// The browser keeps relative URLs (proxied by server.ts); the server calls the API directly
export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url.startsWith('http') || !isPlatformServer(inject(PLATFORM_ID))
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
