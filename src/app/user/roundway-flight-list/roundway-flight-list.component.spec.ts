import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundwayFlightListComponent } from './roundway-flight-list.component';

describe('RoundwayFlightListComponent', () => {
  let component: RoundwayFlightListComponent;
  let fixture: ComponentFixture<RoundwayFlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundwayFlightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundwayFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
