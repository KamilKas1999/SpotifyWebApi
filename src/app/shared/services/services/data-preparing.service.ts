import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { artistShort } from '../../models/artistShort.model';
import { genre } from '../../models/genre.model';
import { songInfo } from '../../models/songInfo.model';
import { trackShort } from '../../models/trackShort.model';

@Injectable({
  providedIn: 'root',
})
export class DataPreparingService {
  private GETRECOMENDGENRESLINK =
    'https://api.spotify.com/v1/recommendations/available-genre-seeds';

  constructor(private http: HttpClient) {}

  prepareArtist(top: songInfo[]): artistShort[] {
    const artists: artistShort[] = [];
    for (let el of top) {
      for (let artist of el.artists) {
        artists.push(new artistShort(artist.name, artist.id));
      }
    }
    return artists;
  }

  getRandomArtist(mapArtist: artistShort[]): artistShort {
    return mapArtist[Math.floor(Math.random() * mapArtist.length)];
  }

  prepareTracks(top: songInfo[]): trackShort[] {
    const tracksNameList: trackShort[] = [];
    for (let el of top) {
      tracksNameList.push({
        name: el.name,
        id: el.id,
      });
    }
    return tracksNameList;
  }

  getRandomTrack(tracksNameList: trackShort[]): trackShort {
    return tracksNameList[Math.floor(Math.random() * tracksNameList.length)];
  }

  getGenres(): Observable<genre> {
    return this.http.get<genre>(this.GETRECOMENDGENRESLINK);
  }

  getRandomGenre(genres: string[]): string {
    return genres[Math.floor(Math.random() * genres.length)];
  }
}
