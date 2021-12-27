import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistInfo } from '../modules/shared/models/artistInfo.model';
import { SongInfo } from '../modules/shared/models/songInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTopAlbumsService {
  private getTopArtistsLink = 'https://api.spotify.com/v1/me/top/artists?limit=3';
  constructor(private http: HttpClient) {}

  getTopAlbums(): Observable<{ items: ArtistInfo[] }> {
    return this.http.get<{ items: ArtistInfo[] }>(this.getTopArtistsLink);
  }


}
