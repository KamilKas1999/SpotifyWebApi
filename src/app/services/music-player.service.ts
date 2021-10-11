import { EventEmitter, Injectable } from '@angular/core';
import { songInfo } from '../modules/shared/models/songInfo.model';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  audio = new Audio();
  actualTime = new EventEmitter<number>();
  isPaused = new EventEmitter<boolean>();
  trackData = new EventEmitter<songInfo>();
  trackDuration = new EventEmitter<number>();
  trackVolume = new EventEmitter<number>();
  interval: any;
  intervalForPaused: any;

  constructor() {}

  pause(): void {
    this.isPaused.next(true);
    this.audio.pause();
    this.pauseInterval();
  }

  play(newTrack: songInfo): void {
    this.pause();
    this.audio = new Audio(newTrack.preview_url);
    this.isPaused.next(false);
    this.loadAndPlay(newTrack);
  }

  setVolume(newValue: number) {
    console.log('new volume : ' + newValue);
    this.audio.volume = newValue;
  }

  private loadAndPlay(newTrack: songInfo) {
    this.audio.load();
    this.audio.onloadeddata = () => {
      this.trackData.next(newTrack);
      this.trackDuration.next(this.audio.duration);
      this.audio.play();
      this.isPaused.next(false);
      this.playInterval();
    };
  }

  resumeMusic() {
    this.audio.play();
    this.playInterval();
    this.isPaused.next(false);
  }

  private playInterval(): void {
    clearInterval(this.intervalForPaused)
    this.interval = setInterval(() => {
      this.actualTime.next(this.audio.currentTime);
      console.log("playInterval")
      if (this.audio.paused) {
        clearInterval(this.interval);
        this.pauseInterval();
        this.isPaused.next(true);
      }
    }, 50);
  }

  private pauseInterval(){
    clearInterval(this.interval);
    this.intervalForPaused = setInterval(() => {
      console.log("pauseInterval")
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
