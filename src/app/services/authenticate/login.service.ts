import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { MusicPlayerService } from '../limited-music-player/music-player.service';
import { SpotifyMusicPlayerService } from '../spotify-music-player/spotify-music-player.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginEmitter = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private musicPlayer: MusicPlayerService,
    private spotifyPlayerService: SpotifyMusicPlayerService
  ) {}

  isLogin(): boolean {
    return (
      !!localStorage.getItem('access_token') &&
      new Date().getTime() < +localStorage.getItem('expire_date')
    );
  }

  showWindowlogin(): void {
    this.logout(false);
    let scope = environment.spotifyApp.scope;
    let redirect = encodeURIComponent(environment.spotifyApp.redirect_uri);
    window.location.href =
      'https://accounts.spotify.com/authorize?client_id=' +
      environment.spotifyApp.client_id +
      '&response_type=code&redirect_uri=' +
      redirect +
      '&scope=' +
      scope +
      '&show_dialog=true';
  }

  getloginToken(code: string): Observable<User> {
    return this.http
      .post<User>(`${environment.spotifyApp.api}/getToken`, {
        code: code,
        redirect_uri: environment.spotifyApp.redirect_uri,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.access_token,
            resData.expires_in,
            resData.refresh_token
          );
        })
      );
  }

  private handleAuthentication(
    access_token: string,
    expires_in: number,
    refresh_token: string
  ): void {
    const date = new Date().getTime() + expires_in * 1000;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('expire_date', date.toString());
    localStorage.setItem('refresh_token', refresh_token);
    
    this.loginEmitter.next(true);
  }

  logout(sessionExpired: boolean): void {
    this.musicPlayer.clearPlayer();
    this.spotifyPlayerService.disconnect();
    this.loginEmitter.next(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('expire_date');
    localStorage.removeItem('refresh_token');
    if (sessionExpired) {
      this.router.navigate(['/sesionExpired']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

