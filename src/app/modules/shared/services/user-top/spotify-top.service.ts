import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { SongInfo } from '../../models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyTopService {
  private  GET_TOP_TRACKS_URL: string = 'https://api.spotify.com/v1/me/top/tracks';
  private  GET_TOP_ARTISTS_URL: string = 'https://api.spotify.com/v1/me/top/artists';
  constructor(private http: HttpClient) {}

  getTopTracks(): Observable<{ items: SongInfo[] }> {
    return this.http.get<{ items: SongInfo[] }>(this.GET_TOP_TRACKS_URL);
  }

  getTopArtists(): Observable<{ items: Artist[] }> {
    return this.http.get<{ items: Artist[] }>(this.GET_TOP_ARTISTS_URL);
  }
}
