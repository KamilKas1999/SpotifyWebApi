import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, TimeInterval } from 'rxjs';
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
  audio = new Audio();
  isAudioAvailable = false;
  isSaved = false;
  isPaused = false;
  musicTime = 0;
  musicInterval: any;
  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService
  ) {}

  changeTrackSaving(): void {
    if (this.isSaved) {
      this.onRemoveMusic();
    } else {
      this.onSaveMusic();
    }
  }

  onPlayMusic(): void {
    this.musicPlayer.stopAllMusic();
    this.audio.play();
    this.musicInterval = setInterval(() => {
      this.musicTime = this.audio.currentTime;
      if ((this.audio.currentTime == this.audio.duration)) {
        clearInterval(this.musicInterval);
        this.musicTime= 0;
      }
    }, 500);
  }

  onPauseMusic(): void {
    this.audio.pause();
    clearInterval(this.musicInterval);
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

  ngOnInit(): void {
    this.checkUserSavedThisSong();
    this.imageUrl = this.track.album.images[1].url;
    let linkToMusic = this.track.preview_url;
    if (linkToMusic) {
      this.audio = new Audio(linkToMusic);
      this.audio.load();
      this.musicPlayer.add(this.audio);
      this.isAudioAvailable = true;
    }
  }

  checkUserSavedThisSong() {
    this.userLibrary.checkUserSavedTrack(this.track.id).subscribe((data) => {
      this.isSaved = data.pop();
    });
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio = null;
    this.musicPlayer.clearAudioArray();
    clearInterval(this.musicInterval);
  }

  onReplay() {
    this.audio.currentTime = 0;
    this.musicTime = 0;
    clearInterval(this.musicInterval);
    this.onPlayMusic();
  }

  getMusicTime(): number {
    return this.audio.currentTime;
  }
}
