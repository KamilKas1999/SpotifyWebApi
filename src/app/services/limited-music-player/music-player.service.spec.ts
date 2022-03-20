import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MusicPlayerService } from './music-player.service';

describe('MusicPlayerService', () => {
  let service: MusicPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(MusicPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('replay should set time to 0', () => {
    service.audio.currentTime = 1;
    service.replay();
    expect(service.audio.currentTime).toBe(0);
  });
});
