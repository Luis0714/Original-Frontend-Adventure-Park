import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodStandComponent } from './edit-food-stand.component';

describe('EditFoodStandComponent', () => {
  let component: EditFoodStandComponent;
  let fixture: ComponentFixture<EditFoodStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFoodStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
