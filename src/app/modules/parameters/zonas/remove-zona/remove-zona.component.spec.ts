import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveZonaComponent } from './remove-zona.component';

describe('RemoveZonaComponent', () => {
  let component: RemoveZonaComponent;
  let fixture: ComponentFixture<RemoveZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
