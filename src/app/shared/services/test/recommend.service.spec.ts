import { TestBed } from '@angular/core/testing';

import { RecommendService } from '../services/recommend.service';

describe('RecommendService', () => {
  let service: RecommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
