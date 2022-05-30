import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalTicketComponent } from './final-ticket.component';

describe('FinalTicketComponent', () => {
  let component: FinalTicketComponent;
  let fixture: ComponentFixture<FinalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
