import { TestBed } from '@angular/core/testing';

import { VentaPlansService } from './venta-plans.service';

describe('VentaPlansService', () => {
  let service: VentaPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
