// tslint:disable-next-line:no-shadowed-variable
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherService } from '../services/weather.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invoke changeLocation function ', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const e = {
      target: {
        value: 'India'
      }
    };
    component.changeLocation(e);
  });

  it('called headerConfig event emitter and get response', () => {
    const response = 500;
    // const fixture = TestBed.createComponent(HeaderComponent);
    // const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(WeatherService);
    service.changeHeaderConfig({
      cityName: 'India',
      active: true
    });
    service.headerConfig.subscribe((res: any) => {
      component.cityName = res.cityName;
      component.active = res.active;
    });
  });
});
