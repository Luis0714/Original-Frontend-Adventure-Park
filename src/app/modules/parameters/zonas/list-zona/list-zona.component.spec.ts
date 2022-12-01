import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListZonaComponent } from './list-zona.component';

describe('ListZonaComponent', () => {
  let component: ListZonaComponent;
  let fixture: ComponentFixture<ListZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
