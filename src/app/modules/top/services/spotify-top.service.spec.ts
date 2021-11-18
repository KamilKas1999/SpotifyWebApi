import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpotifyTopService } from './spotify-top.service';

describe('SpotifyTopService', () => {
  let service: SpotifyTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyTopService],
    });
    service = TestBed.inject(SpotifyTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
