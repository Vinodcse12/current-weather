import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { BehaviorSubject, Subject } from 'rxjs';
const apiKey: string = environment.api_key;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  citySubj = new BehaviorSubject('London');
  headerConfig = new Subject();

  constructor(private http: HttpClient) { }

  changeCity(selectedCity: string) {
    this.citySubj.next(selectedCity);
  }

  changeHeaderConfig(config: any) {
    this.headerConfig.next(config);
  }

  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}`);
  }
  getForecast(loc: string) {
    return this.http.get(`${environment.apiUrl}/forecast?q=${loc}&appid=${apiKey}`);
  }
}
