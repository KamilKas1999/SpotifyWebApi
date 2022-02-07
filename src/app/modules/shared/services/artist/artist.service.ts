import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`https://api.spotify.com/v1/artists/${id}`);
  }

  getTopArtistTracks(id: string): Observable<{ tracks: SongInfo[] }> {
    return this.http.get<{ tracks: SongInfo[] }>(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=PL`
    );
  }

  getSeveralArist(ids: string[]) : Observable<{ artists: Artist[] }>{
    let id = '';
    for (let a of ids) {
      id = id + a + ',';
    }
    id = id.slice(0,id.length-1)
    return this.http.get<{ artists: Artist[] }>(
      `https://api.spotify.com/v1/artists?ids=${id}`
    );
  }
}
