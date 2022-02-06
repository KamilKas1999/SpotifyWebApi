import { EventEmitter, Injectable } from '@angular/core';
import { MusicPlayerService } from '../limited-music-player/music-player.service';
@Injectable({
  providedIn: 'root',
})
export class PlayerModeService {
  modeEmitter = new EventEmitter<number>();
  mode = 0;

  constructor(private limitedPlayerService: MusicPlayerService) {}

  setMode(mode: number) {
    this.mode = mode;
    this.modeEmitter.emit(this.mode);
    this.limitedPlayerService.pause();
  }
}
