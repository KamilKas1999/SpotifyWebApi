import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { songInfo } from '../../models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private GET_TRACK_LINK =
    'https://api.spotify.com/v1/tracks/';

  constructor(private http: HttpClient) {}

  getTrack(id: string): Observable<songInfo> {
    return this.http.get<songInfo>(`${this.GET_TRACK_LINK}${id}`);
  }
}
