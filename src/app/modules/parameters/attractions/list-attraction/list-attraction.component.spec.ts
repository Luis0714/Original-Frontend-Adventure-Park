import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttractionComponent } from './list-attraction.component';

describe('ListAttractionComponent', () => {
  let component: ListAttractionComponent;
  let fixture: ComponentFixture<ListAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAttractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
