import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { songInfo } from '../../models/songInfo.model';
import { SpotifyTopService } from './spotify-top.service';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  recommendChanged = new Subject<songInfo[]>();
  recommendSongs: songInfo[] = [];
  private token: string;
  private seed_artists = 'seed_artists=4NHQUGzhtTLFvgF5SZesLK';
  private seed_genres = 'pop';
  private seed_tracks = 'seed_tracks=0c6xIDDpzE81m2q797ordA';
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {
    this.loginService.user.subscribe((user) => {
      this.token = user.token;
    });
  }




  getRecommend() {
    this.http
      .get<{ tracks: songInfo[] }>(
        'https://api.spotify.com/v1/recommendations?' + this.seed_artists,
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
        }
      )
      .subscribe((data) => {
        this.recommendSongs = data.tracks;
        this.recommendChanged.next(this.recommendSongs);
      });
  }

  getRecommendArray() {
    return this.recommendSongs;
  }
}
