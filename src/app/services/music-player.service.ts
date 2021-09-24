import { EventEmitter, Injectable } from '@angular/core';
import {
  collapseTextChangeRangesAcrossMultipleVersions,
  isConstructorDeclaration,
} from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  audio = new Audio();
  status = new EventEmitter<number>();
  maxTime = new EventEmitter<number>();
  isPaused = new EventEmitter<boolean>();
  musicName = new EventEmitter<string>();
  interval: any;

  constructor() {}

  pause(): void {
    this.isPaused.next(true);
    this.audio.pause();
    clearInterval(this.interval);
  }

  play(linkToTrack: string, trackName): void {
    this.musicName.next(trackName);
    this.pause();
    this.audio = new Audio(linkToTrack);
    this.audio.load();
    this.audio.onloadeddata = () => {
      this.maxTime.emit(this.audio.duration);
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
    this.interval = setInterval(() => {
      this.status.next(this.audio.currentTime);
      if (this.audio.paused) {
        clearInterval(this.interval);
        this.isPaused.next(true);
      }
    }, 20);
  }

  setTime(time: number): void {
    this.audio.currentTime = time;
  }

  replay() {
    this.audio.currentTime = 0;
  }
}
