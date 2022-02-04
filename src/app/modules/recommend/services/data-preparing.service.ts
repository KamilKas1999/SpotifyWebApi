import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistShort } from '../models/artistShort.model';
import { Genre } from '../models/genre.model';
import { SongInfo } from '../../shared/models/songInfo.model';
import { TrackShort } from '../models/trackShort.model';
import { Artist } from '../../shared/models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class DataPreparingService {
  trackEmitter = new EventEmitter<TrackShort[]>();

  private GETRECOMENDGENRESLINK =
    'https://api.spotify.com/v1/recommendations/available-genre-seeds';

  constructor(private http: HttpClient) {}

  // prepareArtist(top: SongInfo[]): ArtistShort[] {
  //   let artists: ArtistShort[] = [];
  //   const map = new Map<string,string>();
  //   for (let el of top) {
  //     for (let artist of el.artists) {
  //       map.set(artist.id,artist.name);
  //     }
  //   }
  //   map.forEach((value,key) => {
  //     artists.push(new ArtistShort(value,key));
  //   })
  //   return artists;
  // }

  prepareArtist(top: Artist[]): ArtistShort[] {
    const tracksNameList: ArtistShort[] = [];
    for (let el of top) {
      tracksNameList.push(new ArtistShort(el.name, el.id));
    }
    return tracksNameList;
  }

  getRandomArtist(mapArtist: ArtistShort[]): ArtistShort {
    return mapArtist[Math.floor(Math.random() * mapArtist.length)];
  }

  prepareTracks(top: SongInfo[]): TrackShort[] {
    const tracksNameList: TrackShort[] = [];
    for (let el of top) {
      tracksNameList.push(new TrackShort(el.name, el.id));
    }
    return tracksNameList;
  }

  getRandomTrack(tracksNameList: TrackShort[]): TrackShort {
    return tracksNameList[Math.floor(Math.random() * tracksNameList.length)];
  }

  getGenres(): Observable<Genre> {
    return this.http.get<Genre>(this.GETRECOMENDGENRESLINK);
  }

  getRandomGenre(genres: string[]): string {
    return genres[Math.floor(Math.random() * genres.length)];
  }
}
