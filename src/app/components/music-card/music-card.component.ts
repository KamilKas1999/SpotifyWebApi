import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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

  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService
  ) {}

  onPlayMusic(): void {
    this.musicPlayer.stopAllMusic();
    this.audio.play();
  }

  onPauseMusic(): void {
    this.audio.pause();
  }

  onLikeMusic(): void {
    this.userLibrary.putSongToUserLibrary(this.track.id).subscribe();
  }

  ngOnInit(): void {
    this.imageUrl = this.track.album.images[1].url;
    let linkToMusic = this.track.preview_url;
    if (linkToMusic) {
      this.audio = new Audio(linkToMusic);
      this.musicPlayer.add(this.audio);
      this.isAudioAvailable = true;
    }
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio = null;
    this.musicPlayer.clearAudioArray();
  }
}
