import { TestBed } from '@angular/core/testing';

import { SpotifyTopService } from '../shared/services/services/spotify-top.service';

describe('SpotifyTopService', () => {
  let service: SpotifyTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
