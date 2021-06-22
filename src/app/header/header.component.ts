import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = '';
  locations: any[] = [];
  selectedCity = 'Select City';
  active = true;
  cityName = '';
  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit() {
    this.title = 'Weather App';
    this.locations = ['Cambridge', 'Canterbury', 'Chester', 'Bangor', 'London'];
    this.weatherService.headerConfig
      .subscribe((res: any) => {
        this.active = res.active;
        this.cityName = res.cityName;
      });
  }

  changeLocation(e: any) {
    this.router.navigate(['/']);
    this.selectedCity = e.target.value;
    this.weatherService.changeCity(this.selectedCity);

  }

}
