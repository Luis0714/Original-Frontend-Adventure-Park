import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDepartmentComponent } from './remove-department.component';

describe('RemoveDepartmentComponent', () => {
  let component: RemoveDepartmentComponent;
  let fixture: ComponentFixture<RemoveDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
