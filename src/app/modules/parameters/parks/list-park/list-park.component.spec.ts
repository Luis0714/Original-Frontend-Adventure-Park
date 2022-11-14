import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParkComponent } from './list-park.component';

describe('ListParkComponent', () => {
  let component: ListParkComponent;
  let fixture: ComponentFixture<ListParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
