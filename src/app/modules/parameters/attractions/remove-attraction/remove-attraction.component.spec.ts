import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAttractionComponent } from './remove-attraction.component';

describe('RemoveAttractionComponent', () => {
  let component: RemoveAttractionComponent;
  let fixture: ComponentFixture<RemoveAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAttractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
