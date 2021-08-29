import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  audioArray = [];

  constructor() {}

  add(audio: any): void {
    this.audioArray.push(audio);
    console.log(this.audioArray);
  }

  stopAllMusic(): void {
    for (let audio of this.audioArray) {
      audio.pause();
    }
  }

  clearAudioArray(): void {
    this.audioArray = [];
  }
}
