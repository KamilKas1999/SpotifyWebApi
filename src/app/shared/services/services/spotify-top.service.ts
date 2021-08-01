import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import { songInfo } from '../../models/songInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTopService {


  private token: string;
   topTracks : songInfo[] = [];
   private topArrive = new Subject<songInfo[]>();
  
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTopTracks() {
    this.loginService.user.subscribe(user => {
      this.token = user.token;
    })
    return this.http.get<{ items: songInfo[] }>('https://api.spotify.com/v1/me/top/tracks',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })
       })
  }




}
