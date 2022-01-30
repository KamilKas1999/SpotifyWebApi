import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { MessageService } from 'src/app/services/message.service';
import { UserLibraryService } from '../../services/UserLibraryService/user-library.service';


@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit, OnDestroy {
  @Input() track: SongInfo;
  isSaved = false;
  isPaused = false;
  musicTime = 0;
  linkToMusic: string;
  minutes: string | number;
  seconds: string | number;
  artists: string = "";
  number = 0;
  private followMessageText = 'Dodano do polubionych!';
  private unfollowMessageText = 'Usunięto z polubionych!';
  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
      this.checkUserSavedThisSong();
      this.linkToMusic = this.track.preview_url;
      const tempTime = this.track.duration_ms / 60000;
      this.minutes = Math.floor(tempTime);
      this.seconds = String(
        Math.floor((tempTime - this.minutes) * 600)
      ).substring(0, 2);
      let length =       this.track.artists.length;
      for(let i = 0; i <length; i++){
        this.artists = this.artists + this.track.artists[i].name;
        if( i != length - 1){
          this.artists = this.artists + ", ";
        }
      }
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
    this.checkUserSavedThisSong();
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

  checkUserSavedThisSong() {
    this.userLibrary.checkUserSavedTrack(this.track.id).subscribe((data) => {
      this.isSaved = data.pop();
    });
  }

  ngOnDestroy(): void {}

  onReplay() {
    this.musicPlayer.replay();
  }
}
