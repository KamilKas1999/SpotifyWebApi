import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../../services/login.service';
import { songInfo } from '../../shared/models/songInfo.model';
import { SpotifyTopService } from '../../top/services/spotify-top.service';

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
  private LIMIT = 'limit=';
  private MIN_DURATION_MS = 'min_duration_ms=';
  private MAX_DURATION_MS = 'max_duration_ms=';
  private TARGET_DURATION_MS = 'target_duration_ms=';
  private MIN_ACOUSTICNESS = 'min_acousticness=';
  private MAX_ACOUSTICNESS = 'max_acousticness=';
  private MIN_TEMPO = 'min_tempo=';
  private MAX_TEMPO = 'max_tempo=';
  private MIN_POPULARITY = 'min_popularity=';
  private MAX_POPULARITY = 'max_popularity ';
  private RecomendationsLink = 'https://api.spotify.com/v1/recommendations';
  private BEARER = 'Bearer ';
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.user.subscribe((user) => {
      this.token = user.token;
    });
  }

  getRecommend(
    artist: string,
    genre: string,
    track: string,
    limit: number,
    minDuration: number,
    maxDuration: number,
    targetDuration: number,
    minAcousticness: number,
    maxAcousticness: number,
    minTempo: number,
    maxTempo: number,
    minPopularity : number,
    maxPopularity: number
  ) {
    let link =
      this.RecomendationsLink +
      '?' +
      this.LIMIT +
      limit +
      '&' +
      this.SEED_ARTISTS +
      artist +
      '&' +
      this.SEED_GENRES +
      genre +
      '&' +
      this.SEED_TRACKS +
      track;

    if (minDuration) {
      link = link + '&' + this.MIN_DURATION_MS + minDuration;
    }

    if (maxDuration) {
      link = link + '&' + this.MAX_DURATION_MS + maxDuration;
    }
    if (targetDuration) {
      link = link + '&' + this.TARGET_DURATION_MS + targetDuration;
    }
    if (minAcousticness) {
      link = link + '&' + this.MIN_ACOUSTICNESS + minAcousticness;
    }
    if (maxAcousticness) {
      link = link + '&' + this.MAX_ACOUSTICNESS + maxAcousticness;
    }

    if (minTempo) {
      link = link + '&' + this.MIN_TEMPO + minTempo;
    }

    if (maxTempo) {
      link = link + '&' + this.MAX_TEMPO + maxTempo;
    }

    if (minPopularity) {
      link = link + '&' + this.MIN_POPULARITY+ minPopularity;
    }

    if (maxPopularity) {
      link = link + '&' + this.MAX_POPULARITY + maxPopularity;
    }

    this.http
      .get<{ tracks: songInfo[] }>(link, {
        headers: new HttpHeaders({ Authorization: this.BEARER + this.token }),
      })
      .subscribe((data) => {
        this.recommendSongs = data.tracks;
        this.recommendChanged.next(this.recommendSongs);
      });
  }

  getRecommendArray(): songInfo[] {
    return this.recommendSongs;
  }
}
