import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDetailsComponent } from './edit-category-details.component';

describe('EditCategoryDetailsComponent', () => {
  let component: EditCategoryDetailsComponent;
  let fixture: ComponentFixture<EditCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
