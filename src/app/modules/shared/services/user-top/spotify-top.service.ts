import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { SongInfo } from '../../models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyTopService {
  constructor(private http: HttpClient) {}

  getTopTracks(timeRange: string): Observable<{ items: SongInfo[] }> {
    return this.http.get<{ items: SongInfo[] }>(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`);
  }

  getTopArtists(timeRange: string): Observable<{ items: Artist[] }> {
    return this.http.get<{ items: Artist[] }>(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`);
  }
  
}
