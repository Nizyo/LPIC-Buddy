import { TestBed } from '@angular/core/testing';

import { FragenFillinService } from './fragenfillin.service';

describe('FragenFillinService', () => {
  let service: FragenFillinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenFillinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
