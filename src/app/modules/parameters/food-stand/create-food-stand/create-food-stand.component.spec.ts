import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodStandComponent } from './create-food-stand.component';

describe('CreateFoodStandComponent', () => {
  let component: CreateFoodStandComponent;
  let fixture: ComponentFixture<CreateFoodStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFoodStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFoodStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
