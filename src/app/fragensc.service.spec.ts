import { TestBed } from '@angular/core/testing';

import { FragenScService } from './fragensc.service';

describe('FragenScService', () => {
  let service: FragenScService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenScService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
