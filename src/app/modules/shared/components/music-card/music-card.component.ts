import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MusicPlayerService } from 'src/app/services/music-player.service';
import { MessageService } from 'src/app/services/message.service';
import { UserLibraryService } from '../../services/UserLibraryService/user-library.service';
import { ArtistShort } from 'src/app/modules/recommend/models/artistShort.model';
import { Artist } from '../../models/artist.model';
import { SpotifyMusicPlayerService } from 'src/app/services/spotifyMusicPlayer/spotify-music-player.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit, OnDestroy {
  @Input() track: SongInfo;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();

  isSaved = false;
  isPaused = false;
  musicTime = 0;
  minutes: string | number;
  seconds: string | number;
  number = 0;
  isOpen=false;
  private followMessageText = 'Dodano do polubionych!';
  private unfollowMessageText = 'Usunięto z polubionych!';
  constructor(
    private musicPlayer: MusicPlayerService,
    private userLibrary: UserLibraryService,
    private messageService: MessageService,
    private spotifyMusicPlayer: SpotifyMusicPlayerService
  ) {}

  onOpen(){
    this.isOpen = !this.isOpen;
  }

  addToQueue():void{
    this.spotifyMusicPlayer.addToQueue(this.track);
  }

  ngOnInit(): void {
    this.checkUserSavedThisSong();
    const tempTime = this.track.duration_ms / 60000;
    this.minutes = Math.floor(tempTime);
    this.seconds = String(
      Math.floor((tempTime - this.minutes) * 600)
    ).substring(0, 2);
  }

  getArtistShorted(): Artist[]{
    if(this.isOpen) return  this.track.artists;
    return this.track.artists.slice(0,2);
  }

  plusArtist(): number{
    if(this.isOpen) return 0;
    return this.track.artists.length - 2;;
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
