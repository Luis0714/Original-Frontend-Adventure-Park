import { TestBed } from '@angular/core/testing';

import { FoodStandService } from './food-stand.service';

describe('FoodStandService', () => {
  let service: FoodStandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodStandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
