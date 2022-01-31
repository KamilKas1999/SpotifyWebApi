import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';

export class SearchResponse {
  artists: { items: Artist[] };
  tracks: { items: SongInfo[] };
}
