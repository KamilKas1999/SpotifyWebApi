import { TestBed } from '@angular/core/testing';

import { SpotifyTopAlbumsService } from './spotify-top-albums.service';

describe('SpotifyTopAllbumsService', () => {
  let service: SpotifyTopAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyTopAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
