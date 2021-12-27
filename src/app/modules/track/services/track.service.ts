import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';


@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private GET_TRACK_LINK = 'https://api.spotify.com/v1/tracks/';

  constructor(private http: HttpClient) {}

  getTrack(id: string): Observable<SongInfo> {
    return this.http.get<SongInfo>(`${this.GET_TRACK_LINK}${id}`);
  }
}
