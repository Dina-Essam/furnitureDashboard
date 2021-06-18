import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActiveAboutsComponent } from './all-active-abouts.component';

describe('AllActiveAboutsComponent', () => {
  let component: AllActiveAboutsComponent;
  let fixture: ComponentFixture<AllActiveAboutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllActiveAboutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActiveAboutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
