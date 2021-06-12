import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaxesComponent } from './all-taxes.component';

describe('AllTaxesComponent', () => {
  let component: AllTaxesComponent;
  let fixture: ComponentFixture<AllTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTaxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
