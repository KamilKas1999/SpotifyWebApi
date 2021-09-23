import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MusicPlayerService } from 'src/app/shared/services/services/music-player.service';
import { UserLibraryService } from 'src/app/shared/services/services/user-library.service';
import { songInfo } from '../../shared/models/songInfo.model';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit, OnDestroy {
  @Input() track: songInfo;
  imageUrl: string;
  isSaved = false;
  isPaused = false;
  musicTime = 0;
  linkToMusic: string;
  minutes: string | number;
  seconds: string | number;
  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService
  ) {}

  ngOnInit(): void {
    this.checkUserSavedThisSong();
    this.imageUrl = this.track.album.images[1].url;
    this.linkToMusic = this.track.preview_url;
    const tempTime = this.track.duration_ms / 60000;
    this.minutes = Math.floor(tempTime);
    this.seconds = String(Math.floor((tempTime - this.minutes) * 600)).substring(0,2);
  }

  changeTrackSaving(): void {
    if (this.isSaved) {
      this.onRemoveMusic();
    } else {
      this.onSaveMusic();
    }
  }

  onPlayMusic(): void {
    this.musicPlayer.play(this.linkToMusic, this.track.name);
  }

  onPauseMusic(): void {
    this.musicPlayer.pause();
  }

  onSaveMusic(): void {
    this.userLibrary.putTrackToUserLibrary(this.track.id).subscribe(() => {
      this.isSaved = true;
    });
    this.checkUserSavedThisSong();
  }

  onRemoveMusic(): void {
    this.userLibrary.removeTrackFromUserLibrary(this.track.id).subscribe(() => {
      this.isSaved = false;
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
