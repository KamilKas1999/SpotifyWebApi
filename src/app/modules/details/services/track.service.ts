import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { trackFeature } from '../models/trackFeature.model';


@Injectable({
  providedIn: 'root',
})
export class TrackService {

  constructor(private http: HttpClient) {}

  getTrack(id: string): Observable<SongInfo> {
    return this.http.get<SongInfo>(`https://api.spotify.com/v1/tracks/${id}`);
  }

  getFeaturesForTrack(id: string): Observable<trackFeature> {
    return this.http.get<trackFeature>(`https://api.spotify.com/v1/audio-features/${id}`);
  }
}
