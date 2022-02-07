import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { SongInfo } from '../../models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class PlayListCreatorService {
  private userSub: Subscription;

  constructor(private http: HttpClient, private userService: UserService) {}

  public createPlaylist() {
    let id = this.userService.user.id;
    let link = `https://api.spotify.com/v1/users/${id}/playlists`;
    return this.http.post<{ id: string }>(link, { name: 'Twoje rekomendacje' });
  }

  public addTrackToPlaylist(track: SongInfo, playlistId: string) {
    return this.http.post(
      'https://api.spotify.com/v1/playlists/{playlist_id}/tracks',
      {}
    );
  }
  public addTracksToPlaylist(tracks: SongInfo[], playlistId: string) {
    const ids = tracks.map(track => track.uri);
    return this.http.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {uris:ids}
    );
  }
}
