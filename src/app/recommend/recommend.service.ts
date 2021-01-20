import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { songInfo } from '../shared/songInfo.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendService{
  recommendChanged = new Subject<songInfo[]>();
  recommendSongs : songInfo[] = [];
  token: string;
  seed_artists = 'seed_artists=4NHQUGzhtTLFvgF5SZesLK'
  seed_genres = 'pop'
  seed_tracks = 'seed_tracks=0c6xIDDpzE81m2q797ordA'
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getRecommend() {
    this.loginService.user.subscribe(user => {
      this.token = user.token;
    })

     this.http.get<{tracks : songInfo[]}>('https://api.spotify.com/v1/recommendations?' + this.seed_artists + '&' + this.seed_genres + '&' + this.seed_tracks, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })
    }).subscribe(data => {
      this.recommendSongs = data.tracks;
      this.recommendChanged.next(this.recommendSongs);
    })
  }

  getRecommendArray(){
    return this.recommendSongs;
  }
}
