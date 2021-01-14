import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Url } from 'url';
import { LoginService } from '../shared/login.service';
import { songInfo } from './songInfo/songInfo.model';

export interface data {

  album: {
    images: {
      url: string
    }[]
  },
  name: string

}


@Injectable({
  providedIn: 'root'
})
export class SpotifyTopService {

  token: string;
  topArray: songInfo[];

  constructor(private http: HttpClient, private loginService: LoginService) { }



  getTopTracks() {

    this.loginService.user.subscribe(user => {
      this.token = user.token;
    })
    return this.http.get<{items : songInfo[]}>('https://api.spotify.com/v1/me/top/tracks',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })

      })
  }




}
