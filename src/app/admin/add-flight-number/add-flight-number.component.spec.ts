import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightNumberComponent } from './add-flight-number.component';

describe('AddFlightNumberComponent', () => {
  let component: AddFlightNumberComponent;
  let fixture: ComponentFixture<AddFlightNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlightNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlightNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
