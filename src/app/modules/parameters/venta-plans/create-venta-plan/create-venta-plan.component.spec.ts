import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVentaPlanComponent } from './create-venta-plan.component';

describe('CreateVentaPlanComponent', () => {
  let component: CreateVentaPlanComponent;
  let fixture: ComponentFixture<CreateVentaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVentaPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVentaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
