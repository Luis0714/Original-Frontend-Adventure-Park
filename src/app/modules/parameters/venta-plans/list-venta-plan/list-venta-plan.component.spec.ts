import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVentaPlanComponent } from './list-venta-plan.component';

describe('ListVentaPlanComponent', () => {
  let component: ListVentaPlanComponent;
  let fixture: ComponentFixture<ListVentaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVentaPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVentaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
