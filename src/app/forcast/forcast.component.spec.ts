// tslint:disable-next-line:no-shadowed-variable
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WeatherService } from '../services/weather.service';

import { ForcastComponent } from './forcast.component';

describe('ForcastComponent', () => {
  let component: ForcastComponent;
  let fixture: ComponentFixture<ForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForcastComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('called headerConfig event emitter and get response', () => {
    const response = 500;
    // fixture = TestBed.createComponent(ForcastComponent);
    // component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(WeatherService);
    service.changeHeaderConfig({
      cityName: 'India',
      active: true
    });
  });

  it('called getForecast end point with empty records', () => {
    fixture = TestBed.createComponent(ForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.forecast = [];
    const service = fixture.debugElement.injector.get(WeatherService);
    service.getForecast('India').subscribe((response: any) => {
      component.forecast = response;
    });
  });

  it('called getForecast end point successfully', () => {
    const response: any[] = [{ dt: 1624363200, main: { temp: 296.8, feels_like: 296.03, temp_min: 296.8, temp_max: 297.06, pressure: 1015, sea_level: 1015, grnd_level: 862, humidity: 31, temp_kf: -0.26 }, weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }], clouds: { all: 40 }, wind: { speed: 3.3, deg: 167, gust: 5.61 }, visibility: 10000, pop: 0.21, sys: { pod: 'd' }, dt_txt: '2021-06-22 12:00:00' }, { dt: 1624374000, main: { temp: 296.23, feels_like: 295.56, temp_min: 295.09, temp_max: 296.23, pressure: 1014, sea_level: 1014, grnd_level: 863, humidity: 37, temp_kf: 1.14 }, weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }], clouds: { all: 49 }, wind: { speed: 3.6, deg: 181, gust: 3.85 }, visibility: 10000, pop: 0.5, rain: { '3h': 0.12 }, sys: { pod: 'd' }, dt_txt: '2021-06-22 15:00:00' }];
    fixture = TestBed.createComponent(ForcastComponent);
    component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(WeatherService);
    spyOn(service, 'getForecast').and.returnValue(of(response));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.forecast = response;
    });
  });
});
