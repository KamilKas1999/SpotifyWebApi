import { TestBed } from '@angular/core/testing';

import { TrackFeaturesService } from './track-features.service';

describe('TrackFeaturesService', () => {
  let service: TrackFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
