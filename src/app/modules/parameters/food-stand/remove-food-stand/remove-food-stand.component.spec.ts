import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFoodStandComponent } from './remove-food-stand.component';

describe('RemoveFoodStandComponent', () => {
  let component: RemoveFoodStandComponent;
  let fixture: ComponentFixture<RemoveFoodStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFoodStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFoodStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
