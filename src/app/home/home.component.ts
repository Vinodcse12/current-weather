import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cityWeatherInfo: any[] = [];
  active = true;
  constructor(private router: Router,
              private wheatherService: WeatherService) { }

  ngOnInit() {
    this.wheatherService.changeHeaderConfig({
      cityName: '',
      active: true
    });
    this.wheatherService.citySubj
      .subscribe((city: string) => {
        this.wheatherService.getCurrentWeather(city)
          .pipe(
            map((res: any) => {
              return res;
            })
          )
          .subscribe((res: any) => {
            this.cityWeatherInfo = res;
          });
      });
  }

  goToForcast(name: string) {
    this.wheatherService.changeHeaderConfig({
      cityName: name,
      active: false
    });
    this.router.navigate(['/forcast', name]);
  }

}
