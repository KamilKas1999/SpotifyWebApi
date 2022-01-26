import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserData> {
     return this.http.get<UserData>(
       'https://api.spotify.com/v1/me'
     );
  }
}
