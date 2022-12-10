import { TestBed } from '@angular/core/testing';

import { CatergoriaService } from './catergoria.service';

describe('CatergoriaService', () => {
  let service: CatergoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatergoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
