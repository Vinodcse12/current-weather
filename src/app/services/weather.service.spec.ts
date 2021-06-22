import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  // const service: WeatherService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('change changeHeaderConfig ', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    service.changeHeaderConfig({
      cityName: '',
      active: true
    });
  });

  it('change city', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    service.changeCity('India');
  });

  it('be able to retrieve data from the getCurrentWeather API via GET', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    const dummyPosts = [];
    service.getCurrentWeather('India').subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(dummyPosts);
    });
  });

  it('be able to retrieve data from the getForecast API via GET', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    const dummyPosts = [];
    service.getForecast('India').subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(dummyPosts);
    });
  });
});
