import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePlanComponent } from './remove-plan.component';

describe('RemovePlanComponent', () => {
  let component: RemovePlanComponent;
  let fixture: ComponentFixture<RemovePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
