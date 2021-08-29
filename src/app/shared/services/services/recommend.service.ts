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
  private SEED_ARTISTS = 'seed_artists=';
  private SEED_GENRES = 'seed_genres=';
  private SEED_TRACKS = 'seed_tracks=';
  private LIMIT = 'limit=5';
  private RecomendationsLink = 'https://api.spotify.com/v1/recommendations';
  private BEARER = 'Bearer ';
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.user.subscribe((user) => {
      this.token = user.token;
    });
  }

  getRecommend(artist: string, genre: string, track: string) {
    this.http
      .get<{ tracks: songInfo[] }>(
        this.RecomendationsLink +
          '?' +
          this.LIMIT +
          "&" +
          this.SEED_ARTISTS +
          artist +
          '&' +
          this.SEED_GENRES +
          genre +
          '&' +
          this.SEED_TRACKS +
          track,
        {
          headers: new HttpHeaders({ Authorization: this.BEARER + this.token }),
        }
      )
      .subscribe((data) => {
        this.recommendSongs = data.tracks;
        this.recommendChanged.next(this.recommendSongs);
      });
  }

  getRecommendArray(): songInfo[] {
    return this.recommendSongs;
  }
}
