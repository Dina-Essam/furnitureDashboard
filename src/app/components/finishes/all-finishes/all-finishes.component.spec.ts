import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFinishesComponent } from './all-finishes.component';

describe('AllFinishesComponent', () => {
  let component: AllFinishesComponent;
  let fixture: ComponentFixture<AllFinishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFinishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFinishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
