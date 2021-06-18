import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAboutsComponent } from './all-abouts.component';

describe('AllAboutsComponent', () => {
  let component: AllAboutsComponent;
  let fixture: ComponentFixture<AllAboutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAboutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAboutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
