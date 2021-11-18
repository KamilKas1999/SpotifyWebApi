import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrackFeaturesService } from './track-features.service';

describe('TrackFeaturesService', () => {
  let service: TrackFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackFeaturesService],
    });
    service = TestBed.inject(TrackFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
