import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpotifyTopAlbumsService } from './spotify-top-albums.service';

describe('SpotifyTopAllbumsService', () => {
  let service: SpotifyTopAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyTopAlbumsService],
    });
    service = TestBed.inject(SpotifyTopAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
