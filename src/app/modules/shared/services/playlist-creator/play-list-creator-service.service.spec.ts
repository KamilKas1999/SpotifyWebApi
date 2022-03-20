import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { PlayListCreatorService } from './play-list-creator-service.service';

describe('PlayListCreatorServiceService', () => {
  let service: PlayListCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterModule.forRoot([])
    ],
    });
    service = TestBed.inject(PlayListCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
