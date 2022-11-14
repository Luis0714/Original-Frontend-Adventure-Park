import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkComponent } from './create-park.component';

describe('CreateParkComponent', () => {
  let component: CreateParkComponent;
  let fixture: ComponentFixture<CreateParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
