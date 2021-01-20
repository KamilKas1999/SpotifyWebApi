import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { songInfo } from '../shared/songInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTopService {


  token: string;
  topTracks : songInfo[] = [];
  topArrive = new Subject<songInfo[]>();
  
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getTopTracks() {
    this.loginService.user.subscribe(user => {
      this.token = user.token;
    })
    return this.http.get<{ items: songInfo[] }>('https://api.spotify.com/v1/me/top/tracks',
      {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })
      }).subscribe(data => {
        this.topTracks = data.items;
        this.topArrive.next(this.topTracks)
      })
  }




}
