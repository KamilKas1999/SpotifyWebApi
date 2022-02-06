import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MusicPlayerService } from 'src/app/services/limited-music-player/music-player.service';
import { PlayerModeService } from 'src/app/services/player-mode/player-mode.service';
import { SpotifyMusicPlayerService } from 'src/app/services/spotify-music-player/spotify-music-player.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  minValue = 0;
  maxValue = 0;
  actuallValue = 0;
  isPaused = true;
  private actuallTimeSub: Subscription;
  private isPausedSub: Subscription;
  private trackSub: Subscription;
  private trackDuration: Subscription;
  private trackVolumeSub: Subscription;
  track: SongInfo;
  isLoading = false;
  minutes: string | number = 0;
  seconds: string | number = 0;
  totalSeconds: string | number = 0;
  totalMinutes: string | number = 0;
  private isLoadingSub: Subscription;
  isOpen = false;
  volume = 0.5;
  mode = 0;
  currentState: any;




  constructor(
    private musicPlayer: MusicPlayerService,
    private spotifyMusicPlayer: SpotifyMusicPlayerService,
    private modeService: PlayerModeService
  ) {}

  ngOnInit(): void {
    this.subTime();
    this.subIsPaused();
    this.subTrack();
    this.subDuration();
    this.subIsLoading();
    this.spotifyMusicPlayer.currentStateEmitter.subscribe(
      (state) => (this.currentState = state)
    );
    this.modeService.modeEmitter.subscribe(newMode => this.mode = newMode)
  }

  setMode(value: number): void {
    this.modeService.setMode(value);
  }

  skipNext() {
    this.spotifyMusicPlayer.skipNext();
  }

  skipPrev() {
    this.spotifyMusicPlayer.skipPrev();
  }

  onExpand(): void {
    this.isOpen = !this.isOpen;
  }
  clearPlayer() {
    this.track = null;
    this.musicPlayer.clearPlayer();
  }

  private subTime(): void {
    this.actuallTimeSub = this.musicPlayer.actualTime.subscribe((time) => {
      this.actuallValue = time;
      this.seconds = this.countSeconds(time);
      this.minutes = this.countMinutes(time);
    });
  }

  private subValume(): void {
    this.trackVolumeSub = this.musicPlayer.trackVolume.subscribe((volume) => {
      this.volume = volume;
    });
  }

  private countSeconds(time: number) {
    return Math.floor(time) % 60;
  }

  private countMinutes(time: number) {
    let cloneTime = time;
    let minutes = 0;
    while (cloneTime >= 60) {
      cloneTime = cloneTime - 60;
      minutes++;
    }
    return minutes;
  }

  private subIsPaused(): void {
    this.isPausedSub = this.musicPlayer.isPaused.subscribe(
      (isPaused) => (this.isPaused = isPaused)
    );
  }

  private subTrack(): void {
    this.trackSub = this.musicPlayer.trackData.subscribe((track) => {
      this.track = track;
    });
  }

  private subDuration(): void {
    this.trackDuration = this.musicPlayer.trackDuration.subscribe(
      (duration) => {
        this.maxValue = duration;
        this.totalSeconds = this.countSeconds(duration);
        this.totalMinutes = this.countMinutes(duration);
      }
    );
  }

  private subIsLoading(): void {
    this.isLoadingSub = this.musicPlayer.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  volumeInput(newValue: number) {
    if (this.mode == 0) {
      this.volume = newValue;
      this.musicPlayer.setVolume(newValue);
    } else if (this.mode == 1) {
      this.spotifyMusicPlayer.setVolume(newValue);
    }
  }

  onClick() {
    if (this.mode == 0) {
      if (this.isPaused) {
        this.musicPlayer.resumeMusic();
      } else {
        this.musicPlayer.pause();
      }
    } else if (this.mode == 1) {
      if (this.currentState.disallows.pausing) {
        this.spotifyMusicPlayer.resume();
      } else if (this.currentState.disallows.resuming) {
        this.spotifyMusicPlayer.pause();
      }
    }
  }

  valueChange(newTime) {
    this.musicPlayer.setTime(newTime);
    this.actuallValue = newTime;
    this.seconds = this.countSeconds(newTime);
    this.minutes = this.countMinutes(newTime);
    this.subTime();
  }
  valueInput(s) {
    this.actuallTimeSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.actuallTimeSub.unsubscribe();
    this.isPausedSub.unsubscribe();
    this.trackSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.trackDuration.unsubscribe();
    this.trackVolumeSub.unsubscribe();
  }
}
