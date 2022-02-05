import { SongInfo } from '../modules/shared/models/songInfo.model';

export class SpotifyPlayerCurrentState {
  track_window: {
    current_track: SongInfo;
  };
}
