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
  interval: any;

  constructor() {}

  pause(): void {
    this.audio.pause();
    clearInterval(this.interval);
  }

  play(linkToMusic: string): void {
    this.pause();
    this.audio = new Audio(linkToMusic);
    this.audio.load();
    this.audio.onloadeddata = () => {
      this.maxTime.emit(this.audio.duration);
      this.audio.play();
      this.playInterval();
    };
  }

  private playInterval(): void {
    this.interval = setInterval(() => {
      this.status.next(this.audio.currentTime);
      console.log('next');
      if (this.audio.paused) {
        clearInterval(this.interval);
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
