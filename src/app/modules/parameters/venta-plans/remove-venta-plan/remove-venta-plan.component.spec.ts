import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVentaPlanComponent } from './remove-venta-plan.component';

describe('RemoveVentaPlanComponent', () => {
  let component: RemoveVentaPlanComponent;
  let fixture: ComponentFixture<RemoveVentaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveVentaPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveVentaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
