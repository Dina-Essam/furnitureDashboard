import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivePoliciesComponent } from './all-active-policies.component';

describe('AllActivePoliciesComponent', () => {
  let component: AllActivePoliciesComponent;
  let fixture: ComponentFixture<AllActivePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllActivePoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActivePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
