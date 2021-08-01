import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { artistShort } from '../../models/artistShort.model';
import { genre } from '../../models/genre.model';
import { songInfo } from '../../models/songInfo.model';
import { trackShort } from '../../models/trackShort.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DataPreparingService {

  private GETRECOMENDGENRESLINK = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
  private token: string;

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.loginService.user.subscribe((user) => {
      this.token = user.token;
    });
  }

  prepareArtist(top: songInfo[]) : artistShort[] {
    const artists: artistShort[] = [];
    for (let el of top) {
      for (let artist of el.artists) {
         artists.push({
           name : artist.name,
           id : artist.id
         })
      }
    }
    return artists;
  }

  getRandomArtist(mapArtist: artistShort[]){
    return mapArtist[Math.floor(Math.random() * mapArtist.length)];
  }

  prepareTracks(top: songInfo[]): trackShort[]  {
    const tracksNameList : trackShort[] = [];
    for (let el of top) {
      tracksNameList.push({
        name : el.name,
        id : el.id
      });
    }
    return tracksNameList;
  }

  getRandomTrack(tracksNameList: trackShort[]) : trackShort{
    return tracksNameList[Math.floor(Math.random() * tracksNameList.length)];
  }

  getGenres(){
    return this.http.get<genre>(this.GETRECOMENDGENRESLINK,        {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    });
  }

  getRandomGenre(genres: string[]){
    return genres[Math.floor(Math.random() * genres.length)];
  }



}
