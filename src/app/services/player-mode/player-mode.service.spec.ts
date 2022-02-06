import { TestBed } from '@angular/core/testing';

import { PlayerModeService } from './player-mode.service';

describe('PlayerModeService', () => {
  let service: PlayerModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
