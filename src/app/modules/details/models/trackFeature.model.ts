export class trackFeature {
  private _danceability: number;
  private _energy: number;
  private _key: number;
  private _loudness : number;
  private _mode: number;
  private _speechiness: number;
  private _acousticness: number;
  private _instrumentalness: number;
  private _liveness: number;
  private _valence: number;
  private _tempo: number;
  private _type: string;
  private _id: string;
  private _uri: string;
  private _track_href: string;
  private _anylysis_url;
  private _duration_ms: number;
  private _time_signature;
  public get danceability() {
    return this._danceability;
  }
  public get energy() {
    return this._energy;
  }
  public get speechiness() {
    return this._speechiness;
  }

  public get acousticness() {
    return this._acousticness;
  }
  public get instrumentalness() {
    return this._instrumentalness;
  }
  public get liveness() {
    return this._liveness;
  }

  public get valence() {
    return this._valence;
  }
  public get tempo() {
    return this._tempo;
  }
  public get loudness() {
    return this._loudness;
  }
}
