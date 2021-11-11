import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { artistInfo } from '../modules/shared/models/artistInfo.model';
import { songInfo } from '../modules/shared/models/songInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTopAlbumsService {
  private getTopArtistsLink = 'https://api.spotify.com/v1/me/top/artists?limit=3';
  constructor(private http: HttpClient) {}

  getTopAlbums(): Observable<{ items: artistInfo[] }> {
    return this.http.get<{ items: artistInfo[] }>(this.getTopArtistsLink);
  }


}
