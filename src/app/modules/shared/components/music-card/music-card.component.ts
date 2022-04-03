import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MusicPlayerService } from 'src/app/services/limited-music-player/music-player.service';
import { MessageService } from 'src/app/services/message/message.service';
import { UserLibraryService } from '../../services/user-library/user-library.service';
import { ArtistShort } from 'src/app/modules/recommend/models/artistShort.model';
import { Artist } from '../../models/artist.model';
import { SpotifyMusicPlayerService } from 'src/app/services/spotify-music-player/spotify-music-player.service';
import { PlayerModeService } from 'src/app/services/player-mode/player-mode.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit, OnDestroy {
  @Input() track: SongInfo;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();

  @Input('isSaved') isSaved = false;
  isPaused = false;
  musicTime = 0;
  minutes: string | number;
  seconds: string | number;
  number = 0;
  isOpen = false;
  mode = 0;
  private followMessageText = 'Dodano do polubionych!';
  private unfollowMessageText = 'Usunięto z polubionych!';
  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService,
    private messageService: MessageService,
    private spotifyMusicPlayer: SpotifyMusicPlayerService,
    private modeService: PlayerModeService
  ) {}

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  addToQueue(): void {
    this.spotifyMusicPlayer.addToQueue(this.track);
  }

  ngOnInit(): void {
   // this.checkUserSavedThisSong();
    const tempTime = this.track.duration_ms / 60000;
    this.minutes = Math.floor(tempTime);
    this.seconds = String(
      Math.floor((tempTime - this.minutes) * 600)
    ).substring(0, 2);
    this.mode = this.modeService.mode;
    this.modeService.modeEmitter.subscribe(newMode => this.mode = newMode);
  }

  getArtistShorted(): Artist[] {
    if (this.isOpen) return this.track.artists;
    return this.track.artists.slice(0, 4);
  }

  plusArtist(): number {
    if (this.isOpen) return 0;
    return this.track.artists.length - 4;
  }

  changeTrackSaving(): void {
    if (this.isSaved) {
      this.onRemoveMusic();
    } else {
      this.onSaveMusic();
    }
  }

  onPlayMusic(): void {
    this.musicPlayer.play(this.track);
  }

  onPauseMusic(): void {
    this.musicPlayer.pause();
  }

  onSaveMusic(): void {
    this.userLibrary.putTrackToUserLibrary(this.track.id).subscribe(() => {
      this.isSaved = true;
      this.messageService.sendMessage(this.followMessageText, this.track.name);
    });
   // this.checkUserSavedThisSong();
  }

  onRemoveMusic(): void {
    this.userLibrary.removeTrackFromUserLibrary(this.track.id).subscribe(() => {
      this.isSaved = false;
      this.messageService.sendMessage(
        this.unfollowMessageText,
        this.track.name
      );
    });
  }

  // checkUserSavedThisSong() {
  //   this.userLibrary.checkUserSavedTrack(this.track.id).subscribe((data) => {
  //     this.isSaved = data.pop();
  //   });
  // }

  ngOnDestroy(): void {}

  onReplay() {
    this.musicPlayer.replay();
  }
}
