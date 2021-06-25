import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryDetailsComponent } from './create-category-details.component';

describe('CreateCategoryDetailsComponent', () => {
  let component: CreateCategoryDetailsComponent;
  let fixture: ComponentFixture<CreateCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
