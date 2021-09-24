import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { songInfo } from '../../shared/models/songInfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyTopService {
  private getTopTracksLink = 'https://api.spotify.com/v1/me/top/tracks';
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getTopTracks(): Observable<{ items: songInfo[] }> {
    return this.http.get<{ items: songInfo[] }>(this.getTopTracksLink);
  }
}
