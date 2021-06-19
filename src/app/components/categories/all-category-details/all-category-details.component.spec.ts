import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoryDetailsComponent } from './all-category-details.component';

describe('AllCategoryDetailsComponent', () => {
  let component: AllCategoryDetailsComponent;
  let fixture: ComponentFixture<AllCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
