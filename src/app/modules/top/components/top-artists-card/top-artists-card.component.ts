import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { UserLibraryService } from 'src/app/modules/shared/services/user-library/user-library.service';
import { MusicPlayerService } from 'src/app/services/limited-music-player/music-player.service';
import { MessageService } from 'src/app/services/message/message.service';
import { PlayerModeService } from 'src/app/services/player-mode/player-mode.service';
import { SpotifyMusicPlayerService } from 'src/app/services/spotify-music-player/spotify-music-player.service';

@Component({
  selector: 'app-top-artists-card',
  templateUrl: './top-artists-card.component.html',
  styleUrls: ['./top-artists-card.component.scss'],
})
export class TopArtistsCardComponent implements OnInit {
  @Input() artist: Artist;
  isOpen = false;

  constructor() {}

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {}

  getGenresShorted() {
    if (this.isOpen) return this.artist.genres;
    return this.artist.genres.slice(0, 5);
  }

  plusGenre() {
    if (this.isOpen) return 0;
    return this.artist.genres.length - 5;
  }

  ngOnDestroy(): void {}
}
