import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { environment } from '../../../../environments/environment';
export interface TokenData {
  access_token: string;
  token_type: string;
  scope: string;
  expire_in: number;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new BehaviorSubject<User>(null);
  userData: User;

  constructor(private http: HttpClient, private router: Router) {}

  isLogin(): boolean {
    return !!this.userData;
  }

  showWindowlogin(): void {
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

  getloginToken(code: string): Observable<TokenData> {
    console.log("get token")
    return this.http
      .post<TokenData>(`${environment.spotifyApp.api}/getToken`, {
        code: code,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.access_token,
            resData.token_type,
            resData.scope,
            resData.expire_in,
            resData.refresh_token
          );
        })
      );
  }

  private handleAuthentication(
    access_token: string,
    token_type: string,
    scope: string,
    expire_in: number,
    refresh_token: string
  ): void {
    this.userData = new User(
      access_token,
      token_type,
      scope,
      expire_in,
      refresh_token
    );
    this.user.next(this.userData);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/']);
  }
}
