import { TestBed } from '@angular/core/testing';

import { BesoinService } from './besoin.service';

describe('BesoinSerbiceService', () => {
  let service: BesoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BesoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
