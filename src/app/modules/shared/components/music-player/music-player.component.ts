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
  //shared
  minValue = 0;
  maxValue = 0;
  actuallValue = 0;
  isPaused = true;
  minutes: string | number = 0;
  seconds: string | number = 0;
  totalSeconds: string | number = 0;
  totalMinutes: string | number = 0;
  isOpen: boolean = false;
  volume = 0.5;
  mode = 0;
  private modeSub: Subscription;
  //limited-mode
  private actuallTimeSub: Subscription;
  private isPausedSub: Subscription;
  private trackSub: Subscription;
  private trackDuration: Subscription;
  private trackVolumeSub: Subscription;
  track: SongInfo;
  //spotify-mode
  private currentStateSub: Subscription;
  currentState: any;

  //shared
  constructor(
    private musicPlayer: MusicPlayerService,
    private spotifyMusicPlayer: SpotifyMusicPlayerService,
    private modeService: PlayerModeService
  ) {}

  ngOnInit(): void {
    this.subShared();
    this.subLimited();
  }

  private subShared() {
    this.subMode();
  }

  private unsubShared() {
    this.modeSub.unsubscribe();
  }

  private subMode() {
    this.modeSub = this.modeService.modeEmitter.subscribe((newMode) => {
      this.mode = newMode;
      if (this.mode == 0) {
        this.unsubSpotify();
        this.subLimited();
      } else if (this.mode == 1) {
        this.unsubLimited();
        this.subSpotify();
      }
    });
  }

  setMode(value: number): void {
    this.modeService.setMode(value);
  }

  onExpand(): void {
    this.isOpen = !this.isOpen;
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
      this.onClickLimitedMode();
    } else if (this.mode == 1) {
      this.onClickSpotifyMode();
    }
  }

  valueChange(newTime) {
    this.actuallValue = newTime;
    if (this.mode == 0) {
      this.musicPlayer.setTime(newTime);
      this.seconds = this.countSeconds(newTime);
      this.minutes = this.countMinutes(newTime);
      this.subTime();
    } else if (this.mode == 1) {
      this.spotifyMusicPlayer.setPosition(newTime);
    }
  }
  valueInput() {
    this.actuallTimeSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subShared();
  }

  //limited-mode
  private subLimited() {
    this.subDuration();
    this.subTime();
    this.subIsPaused();
    this.subTrack();
    this.subValume();
  }

  private unsubLimited() {
    this.actuallTimeSub.unsubscribe();
    this.isPausedSub.unsubscribe();
    this.trackSub.unsubscribe();
    this.trackDuration.unsubscribe();
    this.trackVolumeSub.unsubscribe();
  }
  onClickLimitedMode(): void {
    if (this.isPaused) {
      this.musicPlayer.resumeMusic();
    } else {
      this.musicPlayer.pause();
    }
  }
  private subTime(): void {
    if (this.actuallTimeSub) this.actuallTimeSub.unsubscribe();
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

  //spotify-mode

  private subSpotify() {
    this.subCurrentState();
  }

  private unsubSpotify() {
    this.currentStateSub.unsubscribe();
  }

  private onClickSpotifyMode(): void {
    if (this.currentState.disallows.pausing) {
      this.spotifyMusicPlayer.resume();
    } else if (this.currentState.disallows.resuming) {
      this.spotifyMusicPlayer.pause();
    }
  }

  private subCurrentState(): void {
    this.spotifyMusicPlayer.currentStateEmitter.subscribe((state) => {
      this.currentState = state;
      this.updateTimeFromSpotify(state);
    });
  }
  updateTimeFromSpotify(state) {
    if (!state) return;
    this.actuallValue = state.position;
    this.seconds = this.countSecondsSpotify(state.position);
    this.minutes = this.countMinutesSpotify(state.position);
    this.maxValue = state.duration;
    this.totalSeconds = this.countSecondsSpotify(state.duration);
    this.totalMinutes = this.countMinutesSpotify(state.duration);
  }

  private countSecondsSpotify(time: number) {
    return ((Math.floor(time) / 1000) % 60).toFixed(0);
  }

  private countMinutesSpotify(time: number) {
    let cloneTime = time / 1000;
    let minutes = 0;
    while (cloneTime >= 60) {
      cloneTime = cloneTime - 60;
      minutes++;
    }
    return minutes.toFixed(0);
  }

  skipNext() {
    this.spotifyMusicPlayer.skipNext();
  }

  skipPrev() {
    this.spotifyMusicPlayer.skipPrev();
  }
}
