import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecommendService } from './recommend.service';

describe('RecommendService', () => {
  let service: RecommendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecommendService],
    });
    service = TestBed.inject(RecommendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
