import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { error } from 'protractor';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (!navigator.geolocation){
  alert('navegador no soporta la geolocalizacion');
  throw new Error('navegador no soporta la geolicalizacion'); 
}


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
