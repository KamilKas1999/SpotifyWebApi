import { TestBed } from '@angular/core/testing';

import { HeaderVisibleService } from '../services/header-visible.service';

describe('HeaderVisibleService', () => {
  let service: HeaderVisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderVisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
