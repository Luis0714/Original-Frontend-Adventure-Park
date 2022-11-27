import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCityComponent } from './remove-city.component';

describe('RemoveCityComponent', () => {
  let component: RemoveCityComponent;
  let fixture: ComponentFixture<RemoveCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
