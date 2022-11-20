import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRolComponent } from './remove-rol.component';

describe('RemoveRolComponent', () => {
  let component: RemoveRolComponent;
  let fixture: ComponentFixture<RemoveRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
