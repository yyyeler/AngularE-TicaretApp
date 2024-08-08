import { TestBed } from '@angular/core/testing';

import { AllcountService } from './allcount.service';

describe('AllcountService', () => {
  let service: AllcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
