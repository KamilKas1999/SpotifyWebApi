import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { trackFeature } from '../../models/trackFeature.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TrackFeaturesService {
  private GET_FEATURE_FOR_TRACK_LINK =
    'https://api.spotify.com/v1/audio-features/';
  private GET_FEATURE_FOR_TRACKS_LINK =
    'https://api.spotify.com/v1/audio-features?ids=';

  constructor(private http: HttpClient) {}

  getFeaturesForTrack(id: string): Observable<trackFeature> {
    return this.http.get<trackFeature>(`${this.GET_FEATURE_FOR_TRACK_LINK}${id}`);
  }

  getFeaturesForTracks(ids: string[]) {
    let url = this.GET_FEATURE_FOR_TRACKS_LINK;
    for (let id of ids) {
      url = url + id + ',';
    }
    return this.http.get(url);
  }
}
