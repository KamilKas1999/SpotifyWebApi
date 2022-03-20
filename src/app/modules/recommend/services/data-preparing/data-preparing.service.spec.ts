import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataPreparingService } from './data-preparing.service';
import { SongInfo } from '../../../shared/models/songInfo.model';
import { ArtistShort } from '../../models/artistShort.model';
import { TrackShort } from '../../models/trackShort.model';
import { Artist } from '../../../shared/models/artist.model';

describe('DataPreparingService', () => {
  let service: DataPreparingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataPreparingService],
    });
    service = TestBed.inject(DataPreparingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
