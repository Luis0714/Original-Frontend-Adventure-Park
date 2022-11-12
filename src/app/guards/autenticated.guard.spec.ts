import { TestBed } from '@angular/core/testing';

import { AutenticatedGuard } from './autenticated.guard';

describe('AutenticatedGuard', () => {
  let guard: AutenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
