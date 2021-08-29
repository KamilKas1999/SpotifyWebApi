import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLibraryService {
  private SAVE_TRACK_FOR_USER_LINK = 'https://api.spotify.com/v1/me/tracks';
  private CHECK_USERS_SAVED_TRACKS_LINK =
    'https://api.spotify.com/v1/me/tracks/contains';
  private REMOVE_TRACK_FROM_LIBRARY_LINK =
    'https://api.spotify.com/v1/me/tracks';

  constructor(private http: HttpClient) {}

  putTrackToUserLibrary(id: string): Observable<any> {
    return this.http.put(`${this.SAVE_TRACK_FOR_USER_LINK}?ids=${id}`, {});
  }

  checkUserSavedTrack(id: string): Observable<boolean[]> {
    return this.http.get<boolean[]>(
      `${this.CHECK_USERS_SAVED_TRACKS_LINK}?ids=${id}`
    );
  }

  removeTrackFromUserLibrary(id: string): Observable<any> {
    return this.http.delete(`${this.REMOVE_TRACK_FROM_LIBRARY_LINK}?ids=${id}`);
  }
}
