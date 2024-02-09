import { TestBed } from '@angular/core/testing';

import { FragenService } from './fragen.service';

describe('FragenService', () => {
  let service: FragenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
