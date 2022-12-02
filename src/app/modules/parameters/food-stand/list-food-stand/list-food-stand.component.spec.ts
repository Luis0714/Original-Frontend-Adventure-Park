import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodStandComponent } from './list-food-stand.component';

describe('ListFoodStandComponent', () => {
  let component: ListFoodStandComponent;
  let fixture: ComponentFixture<ListFoodStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFoodStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
