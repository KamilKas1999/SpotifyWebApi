import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLibraryService {
  private SAVE_TRACK_FOR_USER_LINK = 'https://api.spotify.com/v1/me/tracks';

  constructor(private http: HttpClient) {}

  putSongToUserLibrary(id: string): Observable<any> {
    return this.http.put(`${this.SAVE_TRACK_FOR_USER_LINK}?ids=${id}`, {
    });
  }
}
