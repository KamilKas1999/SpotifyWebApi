import { artistShort } from './artistShort.model';
import { trackShort } from './trackShort.model';

export class PrimarySettings {
  private _artist: artistShort = new artistShort('', '');
  private _genre: string = '';
  private _track: trackShort = new trackShort('', '');
  private _limit: number = 5;
  artistActive: boolean = true;
  trackActive: boolean = true;
  genreActive: boolean = true;

  public get artist(): artistShort {
    return this.artistActive ? this._artist : new artistShort('', '');
  }
  public get genre(): string {
    return this.genreActive ? this._genre : '';
  }
  public get track(): trackShort {
    return this.trackActive ? this._track : new trackShort('', '');
  }
  public get limit(): number {
    return this._limit;
  }

  public set artist(artist: artistShort) {
    this._artist = artist;
  }
  public set genre(genre: string) {
    this._genre = genre;
  }
  public set track(track: trackShort) {
    this._track = track;
  }
  public set limit(limit: number) {
    this._limit = limit;
  }
}
