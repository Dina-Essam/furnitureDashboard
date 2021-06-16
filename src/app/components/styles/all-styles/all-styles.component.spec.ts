import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStylesComponent } from './all-styles.component';

describe('AllStylesComponent', () => {
  let component: AllStylesComponent;
  let fixture: ComponentFixture<AllStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStylesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
