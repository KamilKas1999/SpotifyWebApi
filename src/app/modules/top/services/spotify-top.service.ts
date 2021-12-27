import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SongInfo } from '../../shared/models/songInfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyTopService {
  private getTopTracksLink = 'https://api.spotify.com/v1/me/top/tracks';
  constructor(private http: HttpClient) {}

  getTopTracks(): Observable<{ items: SongInfo[] }> {
    return this.http.get<{ items: SongInfo[] }>(this.getTopTracksLink);
  }
}
