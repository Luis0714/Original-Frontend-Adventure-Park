import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVentaPlanComponent } from './edit-venta-plan.component';

describe('EditVentaPlanComponent', () => {
  let component: EditVentaPlanComponent;
  let fixture: ComponentFixture<EditVentaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVentaPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVentaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
