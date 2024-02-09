import { TestBed } from '@angular/core/testing';

import { FragenMcService } from './fragenmc.service';

describe('FragenMcService', () => {
  let service: FragenMcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenMcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
