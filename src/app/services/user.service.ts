import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from '../models/userData.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserData = new UserData();
  userEmitter = new EventEmitter<UserData>();
  constructor(private http: HttpClient, private authService: LoginService) {
    if (authService.isLogin()) {
      this.getUserInfo().subscribe();
    }
  }

  getUserInfo(): Observable<UserData> {
    return this.http.get<UserData>('https://api.spotify.com/v1/me').pipe(
      tap((data) => {
        this.user = data;
        this.userEmitter.emit(this.user);
      })
    );
  }
}
