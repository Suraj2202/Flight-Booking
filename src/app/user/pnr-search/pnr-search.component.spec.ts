import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnrSearchComponent } from './pnr-search.component';

describe('PnrSearchComponent', () => {
  let component: PnrSearchComponent;
  let fixture: ComponentFixture<PnrSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnrSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
