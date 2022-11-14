import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveParkComponent } from './remove-park.component';

describe('RemoveParkComponent', () => {
  let component: RemoveParkComponent;
  let fixture: ComponentFixture<RemoveParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveParkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
