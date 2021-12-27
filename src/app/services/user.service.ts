import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<{ display_name: string }> {
     return this.http.get<{ display_name: string }>(
       'https://api.spotify.com/v1/me'
     );
  }
}
