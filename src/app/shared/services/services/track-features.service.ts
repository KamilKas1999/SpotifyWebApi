import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TrackFeaturesService {
  private BEARER = 'Bearer ';
  private token: string;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.user.subscribe((user) => {
      this.token = user.token;
    });
  }

  getFeaturesForTrack(id: string) {
    let url = `https://api.spotify.com/v1/audio-features/${id}`;
    return this.http.get(url, {
      headers: new HttpHeaders({ Authorization: this.BEARER + this.token }),
    });
  }

  getFeaturesForTracks(ids: string[]) {
    let url = `https://api.spotify.com/v1/audio-features?ids=`
    for(let id of ids){
      url = url + id + ",";
    }
    return this.http.get(url, {
      headers: new HttpHeaders({ Authorization: this.BEARER + this.token }),
    });
  }
}
