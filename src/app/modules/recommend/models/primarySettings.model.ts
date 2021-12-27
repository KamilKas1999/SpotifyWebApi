import { ArtistShort } from './artistShort.model';
import { TrackShort } from './trackShort.model';

export class PrimarySettings {
  private _artist: ArtistShort = new ArtistShort('', '');
  private _genre: string = '';
  private _track: TrackShort = new TrackShort('', '');
  private _limit: number = 5;
  artistActive: boolean = true;
  trackActive: boolean = true;
  genreActive: boolean = true;

  public get artist(): ArtistShort {
    return this.artistActive ? this._artist : new ArtistShort('', '');
  }
  public get genre(): string {
    return this.genreActive ? this._genre : '';
  }
  public get track(): TrackShort {
    return this.trackActive ? this._track : new TrackShort('', '');
  }
  public get limit(): number {
    return this._limit;
  }

  public set artist(artist: ArtistShort) {
    this._artist = artist;
  }
  public set genre(genre: string) {
    this._genre = genre;
  }
  public set track(track: TrackShort) {
    this._track = track;
  }
  public set limit(limit: number) {
    this._limit = limit;
  }
}
