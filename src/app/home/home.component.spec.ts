// tslint:disable-next-line:no-shadowed-variable
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WeatherService } from '../services/weather.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change changeHeaderConfig ', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    service.changeHeaderConfig({
      cityName: '',
      active: true
    });
  });

  it('called getCurrentWeather end point failed ', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.cityWeatherInfo = [];
    const service = fixture.debugElement.injector.get(WeatherService);
    service.getCurrentWeather('India').subscribe((response: any) => {
      component.cityWeatherInfo = response;
    });
  });

  it('invoke goToForcast function ', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.goToForcast('India');
  });

  it('called getCurrentWeather end point successfully', () => {
    const response: any[] = [{ coord: { lon: 12.2797, lat: 46.7406 }, weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }], base: 'stations', main: { temp: 296.8, feels_like: 296.03, temp_min: 293.61, temp_max: 297.15, pressure: 1015, humidity: 31 }, visibility: 10000, wind: { speed: 3.3, deg: 167, gust: 5.61 }, clouds: { all: 40 }, dt: 1624362490, sys: { type: 1, id: 6809, country: 'IT', sunrise: 1624331828, sunset: 1624388914 }, timezone: 7200, id: 3168508, name: 'Innichen', cod: 200 }];
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(WeatherService);
    spyOn(service, 'getCurrentWeather').and.returnValue(of(response));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.cityWeatherInfo = response;
    });
  });
});
