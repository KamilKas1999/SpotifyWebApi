import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { AdvancedSettings } from '../../models/advancedSettings.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendService {
  recommendChanged = new Subject<SongInfo[]>();
  private recommendSongs: SongInfo[] = [];
  private SEED_ARTISTS = 'seed_artists';
  private SEED_GENRES = 'seed_genres';
  private SEED_TRACKS = 'seed_tracks';
  private TARGET_TEMPO = 'target_tempo=';
  private TARGET_INSTRUMENTALNESS = 'target_instrumentalness';
  private TARGET_ENERGY = 'target_energy';
  private TARGET_DANCEABILITY = 'target_danceability';
  private TARGET_ACOUSTICNESS = 'target_acousticness';

  private RecomendationsLink = 'https://api.spotify.com/v1/recommendations';
  added: any[] = [];
  advancedSettings: AdvancedSettings = new AdvancedSettings();
  isLoadingEmmiter = new EventEmitter<boolean>();

  getRecommendSongs(): SongInfo[] {
    return this.recommendSongs.slice();
  }

  constructor(private http: HttpClient) {}

  getRecommend(): Observable<{ tracks: SongInfo[] }> {
    return this.http.get<{ tracks: SongInfo[] }>(this.createLink().href).pipe(
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

  getRecommendArray(): SongInfo[] {
    return this.recommendSongs;
  }

  private createLink(): URL {
    let link = this.RecomendationsLink;

    const url = new URL(link);
    this.added.forEach((el) => {
      if (el.type == 'TRACK') {
        if (!url.href.includes(this.SEED_TRACKS)) {
          console.log('add key ' + this.SEED_TRACKS + ' ' + el.name);
          url.searchParams.append(this.SEED_TRACKS, el.id);
        } else {
          url.href = url.href + ',' + el.id;
        }
      }
    });
    this.added.forEach((el) => {
      if (el.type == 'ARTIST') {
        if (!url.href.includes(this.SEED_ARTISTS)) {
          console.log('add key ' + this.SEED_ARTISTS + ' ' + el.name);
          url.searchParams.append(this.SEED_ARTISTS, el.id);
        } else {
          console.log('add value ' + el.name);
          url.href = url.href + ',' + el.id;
        }
      }
    });
    this.added.forEach((el) => {
      if (!el.type) {
        if (!url.href.includes(this.SEED_GENRES)) {
          console.log('add key ' + this.SEED_GENRES + ' ' + el);
          url.searchParams.append(this.SEED_GENRES, el);
        } else {
          console.log('add value ' + el);
          url.href = url.href + ',' + el;
        }
      }
    });

    url.searchParams.append(
      this.TARGET_ENERGY,
      this.advancedSettings.energy.toString()
    );
    url.searchParams.append(
      this.TARGET_ACOUSTICNESS,
      this.advancedSettings.acousticness.toString()
    );
    url.searchParams.append(
      this.TARGET_DANCEABILITY,
      this.advancedSettings.danceability.toString()
    );
    url.searchParams.append(
      this.TARGET_INSTRUMENTALNESS,
      this.advancedSettings.instrumentalness.toString()
    );
    url.searchParams.append(
      this.TARGET_TEMPO,
      this.advancedSettings.tempo.toString()
    );
    return url;
  }
}
