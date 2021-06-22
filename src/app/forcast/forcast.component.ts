import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {
  loc: string;
  forecast: any[] = [];
  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.weatherService.changeHeaderConfig({
      cityName: '',
      active: false
    });
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.loc = params.get('name');
        this.weatherService.getForecast(this.loc)
          .pipe(
            map((res: any) => {
              return res.list;
            })
          )
          .subscribe(res => {
            this.forecast = res;
          }, err => {
            // console.log(err);
          });
      });
  }

}
