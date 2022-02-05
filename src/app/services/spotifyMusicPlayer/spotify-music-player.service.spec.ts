import { TestBed } from '@angular/core/testing';

import { SpotifyMusicPlayerService } from './spotify-music-player.service';

describe('SpotifyMusicPlayerService', () => {
  let service: SpotifyMusicPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyMusicPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
