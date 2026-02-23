import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideAuth0( {
      domain: "dev-ua05rh5xic5rwbmr.us.auth0.com",
      clientId: "Jtoo9VE9wtYaNQ8TjkKq9EErDnL95hkJ",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideHttpClient(),
    appConfig.providers
  ]
}).catch((err) => console.error(err));
