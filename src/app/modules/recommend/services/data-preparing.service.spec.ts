import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataPreparingService } from './data-preparing.service';
import { Album } from '../../shared/models/album.model';
import { ArtistInfo } from '../../shared/models/artistInfo.model';
import { SongInfo } from '../../shared/models/songInfo.model';
import { ArtistShort } from '../models/artistShort.model';
import { TrackShort } from '../models/trackShort.model';
import { Artist } from '../../shared/models/artist.model';

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

  it('should prepare and return ArtistShort array', () => {
    let fakeInput: SongInfo[] = [];
    let fakeTrackFirst: SongInfo = new SongInfo();
    let fakeArtistFirst: Artist = new Artist();
    fakeArtistFirst.name = 'artist_name';
    fakeArtistFirst.id = '11';
    fakeTrackFirst.artists = [];
    fakeTrackFirst.artists.push(fakeArtistFirst);
    let fakeTrackSecond: SongInfo = new SongInfo();
    fakeTrackSecond.artists = [];
    fakeTrackSecond.artists.push(fakeArtistFirst);
    let fakeArtistSecond: Artist  = new Artist();
    fakeArtistSecond.name = 'another_artist_name';
    fakeArtistSecond.id = '12';
    fakeTrackFirst.artists = [];
    fakeTrackFirst.artists.push(fakeArtistFirst);
    fakeTrackFirst.artists.push(fakeArtistSecond);
    fakeInput.push(fakeTrackFirst);
    fakeInput.push(fakeTrackSecond);
    let fakeOutput: ArtistShort[] = [
      new ArtistShort('artist_name', '11'),
      new ArtistShort('another_artist_name', '12'),
    ];
    expect(service.prepareArtist(fakeInput)).toEqual(fakeOutput);
  });

  it('should prepare and return TrackShort array', () => {
    let fakeInput: SongInfo[] = [];
    let fakeTrackFirst: SongInfo = new SongInfo();
    fakeTrackFirst.name = 'track_name';
    fakeTrackFirst.id = '21';
    let fakeTrackSecond: SongInfo = new SongInfo();
    fakeTrackSecond.name = 'track_another_name';
    fakeTrackSecond.id = '22';
    fakeInput.push(fakeTrackFirst);
    fakeInput.push(fakeTrackSecond);
    let fakeOutput: TrackShort[] = [
      new TrackShort('track_name', '21'),
      new TrackShort('track_another_name', '22'),
    ];
    let realOutput: TrackShort[] = service.prepareTracks(fakeInput);
    expect(realOutput).toEqual(fakeOutput);
  });
});
