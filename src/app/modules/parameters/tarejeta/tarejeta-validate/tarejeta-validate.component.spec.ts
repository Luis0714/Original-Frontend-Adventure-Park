import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarejetaValidateComponent } from './tarejeta-validate.component';

describe('TarejetaValidateComponent', () => {
  let component: TarejetaValidateComponent;
  let fixture: ComponentFixture<TarejetaValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarejetaValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarejetaValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
