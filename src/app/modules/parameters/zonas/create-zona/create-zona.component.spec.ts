import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateZonaComponent } from './create-zona.component';

describe('CreateZonaComponent', () => {
  let component: CreateZonaComponent;
  let fixture: ComponentFixture<CreateZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateZonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
