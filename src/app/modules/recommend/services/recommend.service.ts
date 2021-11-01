import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { songInfo } from '../../shared/models/songInfo.model';
import { AdvancedSettings } from '../models/advancedSettings.model';
import { PrimarySettings } from '../models/primarySettings.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  recommendChanged = new Subject<songInfo[]>();
  private recommendSongs: songInfo[] = [];
  private token: string;
  private SEED_ARTISTS = 'seed_artists=';
  private SEED_GENRES = 'seed_genres=';
  private SEED_TRACKS = 'seed_tracks=';
  private LIMIT = 'limit=';
  private MIN_DURATION_MS = 'min_duration_ms=';
  private MAX_DURATION_MS = 'max_duration_ms=';
  private MIN_TEMPO = 'min_tempo=';
  private MAX_TEMPO = 'max_tempo=';
  private MIN_POPULARITY = 'min_popularity=';
  private MAX_POPULARITY = 'max_popularity ';
  private RecomendationsLink = 'https://api.spotify.com/v1/recommendations';
  private BEARER = 'Bearer ';
  private primarySettings: PrimarySettings;
  private advancedSettings: AdvancedSettings;
  primarySettingsEmmiter = new EventEmitter<PrimarySettings>();
  advancedSettingsEmmiter = new EventEmitter<AdvancedSettings>();
  isLoadingEmmiter = new EventEmitter<boolean>();

  getRecommendSongs() : songInfo[] {
     return this.recommendSongs.slice();
  }

  constructor(private http: HttpClient) {
    this.primarySettingsEmmiter.subscribe((settings) => {
      this.primarySettings = settings;
      console.log(this.primarySettings);
    });
    this.advancedSettingsEmmiter.subscribe((settings) => {
      this.advancedSettings = settings;
    });
  }

  getRecommend(): Observable<{ tracks: songInfo[] }> {
    const link = this.createLink();
    return this.http
      .get<{ tracks: songInfo[] }>(link, {
        headers: new HttpHeaders({ Authorization: this.BEARER + this.token }),
      })
      .pipe(
        tap(
          (data) => {
            this.recommendSongs = data.tracks;
            this.recommendChanged.next(this.recommendSongs);
          },
          () => {
            this.recommendSongs = [];
            this.recommendChanged.next(this.recommendSongs);
          }
        )
      );
  }

  getRecommendArray(): songInfo[] {
    return this.recommendSongs;
  }

  private createLink() {
    let link =
      this.RecomendationsLink + '?' + this.LIMIT + this.primarySettings.limit;
    if (this.primarySettings.artistActive) {
      link = link + '&' + this.SEED_ARTISTS + this.primarySettings.artist.id;
    }
    if (this.primarySettings.genreActive) {
      link = link + '&' + this.SEED_GENRES + this.primarySettings.genre;
    }
    if (this.primarySettings.trackActive) {
      link = link + '&' + this.SEED_TRACKS + this.primarySettings.track.id;
    }

    if (this.advancedSettings.minDuration) {
      link =
        link + '&' + this.MIN_DURATION_MS + this.advancedSettings.minDuration;
    }

    if (this.advancedSettings.maxDuration) {
      link =
        link + '&' + this.MAX_DURATION_MS + this.advancedSettings.maxDuration;
    }

    if (this.advancedSettings.minTempo) {
      link = link + '&' + this.MIN_TEMPO + this.advancedSettings.minTempo;
    }

    if (this.advancedSettings.maxTempo) {
      link = link + '&' + this.MAX_TEMPO + this.advancedSettings.maxTempo;
    }

    if (this.advancedSettings.minPopularity) {
      link =
        link + '&' + this.MIN_POPULARITY + this.advancedSettings.minPopularity;
    }

    if (this.advancedSettings.maxPopularity) {
      link =
        link + '&' + this.MAX_POPULARITY + this.advancedSettings.maxPopularity;
    }
    return link;
  }
}
