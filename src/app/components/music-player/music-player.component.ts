import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicPlayerService } from 'src/app/services/music-player.service';

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
  trackName: string;
  actuallTimeSub: Subscription;
  maxTimeSub: Subscription;
  isPausedSub: Subscription;
  trackNameSub: Subscription;
  constructor(private musicPlayer: MusicPlayerService) {}

  ngOnInit(): void {
    this.actuallTimeSub = this.musicPlayer.status.subscribe(
      (time) => (this.actuallValue = time)
    );
    this.maxTimeSub = this.musicPlayer.maxTime.subscribe(
      (time) => (this.maxValue = time)
    );
    this.isPausedSub = this.musicPlayer.isPaused.subscribe(
      (isPaused) => (this.isPaused = isPaused)
    );
    this.trackNameSub = this.musicPlayer.musicName.subscribe(
      (name) => (this.trackName = name)
    );
  }

  onClick() {
    if (this.isPaused) {
      this.musicPlayer.resumeMusic();
    } else {
      this.musicPlayer.pause();
    }
  }

  valueChange(s) {
    this.musicPlayer.setTime(s);
    this.actuallTimeSub = this.musicPlayer.status.subscribe(
      (time) => (this.actuallValue = time)
    );
  } 
  valueInput(s) {
    this.actuallTimeSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.actuallTimeSub.unsubscribe();
    this.maxTimeSub.unsubscribe();
    this.isPausedSub.unsubscribe();
    this.trackNameSub.unsubscribe();
  }
}
