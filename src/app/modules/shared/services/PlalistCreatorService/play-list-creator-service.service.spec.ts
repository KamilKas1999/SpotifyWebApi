import { TestBed } from '@angular/core/testing';

import { PlayListCreatorService } from './play-list-creator-service.service';

describe('PlayListCreatorServiceService', () => {
  let service: PlayListCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayListCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
