import { EventEmitter, Injectable } from '@angular/core';
import { SongInfo } from '../modules/shared/models/songInfo.model';
@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  private audio = new Audio();
  actualTime = new EventEmitter<number>();
  isPaused = new EventEmitter<boolean>();
  trackData = new EventEmitter<SongInfo>();
  trackDuration = new EventEmitter<number>();
  trackVolume = new EventEmitter<number>();
  interval: any;
  intervalForPaused: any;
  isLoading = new EventEmitter<boolean>();
  volume = 0.5;

  private scripts: any = {};

  constructor() {}

  init() {
 
  }

  pause(): void {
    if (!this.audio.paused) {
      this.isPaused.next(true);
      this.audio.pause();
      this.pauseInterval();
    }
  }

  clearPlayer() {
    this.audio.pause();
    this.audio.setAttribute('src', '');
  }

  play(newTrack: SongInfo): void {
    this.pause();
    this.audio.setAttribute('src', newTrack.preview_url);
    this.isPaused.next(false);
    this.loadAndPlay(newTrack);
  }

  setVolume(newValue: number) {
    this.volume = newValue;
    this.audio.volume = newValue;
  }

  private loadAndPlay(newTrack: SongInfo) {
    this.isLoading.next(true);
    this.audio.load();
    this.audio.onloadeddata = () => {
      this.trackData.next(newTrack);
      this.trackDuration.next(this.audio.duration);
      this.audio.volume = this.volume;
      this.audio.play();
      this.isPaused.next(false);
      this.playInterval();
      this.isLoading.next(false);
    };
  }

  resumeMusic() {
    this.audio.play();
    this.playInterval();
    this.isPaused.next(false);
  }

  private playInterval(): void {
    clearInterval(this.intervalForPaused);
    this.interval = setInterval(() => {
      this.actualTime.next(this.audio.currentTime);
      this.actualTime;
      if (this.audio.paused) {
        clearInterval(this.interval);
        this.pauseInterval();
        this.isPaused.next(true);
      }
    }, 50);
  }

  private pauseInterval() {
    clearInterval(this.interval);
    this.intervalForPaused = setInterval(() => {
      if (!this.audio.paused) {
        this.isPaused.next(false);
        this.playInterval();
      }
    }, 100);
  }

  setTime(time: number): void {
    this.audio.currentTime = time;
  }

  replay() {
    this.audio.currentTime = 0;
  }
}
