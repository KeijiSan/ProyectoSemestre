import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor() { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]>{
    return new Promise( (resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=> {
          resolve([coords.longitude, coords.latitude])},
        (err)=>{
          alert('No se pudo obtenerla geolocalizacion')
          console.log(err);
          reject();
        }  
      );
    });
  }
}
