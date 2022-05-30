import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnewayFlightListComponent } from './oneway-flight-list.component';

describe('OnewayFlightListComponent', () => {
  let component: OnewayFlightListComponent;
  let fixture: ComponentFixture<OnewayFlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnewayFlightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnewayFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
