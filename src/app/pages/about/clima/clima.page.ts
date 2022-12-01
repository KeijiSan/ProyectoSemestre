import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from 'src/app/services/places.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const API_KEY = environment.API_KEY
const API_URL =environment.API_URL

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  weatherTemp: any
  todayDate = new Date()
  cityName = ""
  weatherIcon: any
  weatherDetails : any
  name =""

  

  constructor(public httpClient: HttpClient, PlacesService: PlacesService) { 
    this.loadData()
    
  }

  loadData(){
    this.httpClient.get(`${API_URL}/weather?lat=${-33.45694}&lon=${-70.64827}&appid=${API_KEY}`).subscribe(results =>{
      console.log(results);
      this.weatherTemp=results['main']
      this.name= results['name']
      console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0]
      console.log(this.weatherDetails);
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
    })
  }
  ngOnInit() {
  }

}
