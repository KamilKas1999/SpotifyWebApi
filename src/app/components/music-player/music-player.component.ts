import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from 'src/app/modules/shared/models/songInfo.model';
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
  actuallTimeSub: Subscription;
  isPausedSub: Subscription;
  trackSub: Subscription;
  trackDuration: Subscription;
  track: songInfo;
  constructor(private musicPlayer: MusicPlayerService) {}

  ngOnInit(): void {
    this.actuallTimeSub = this.musicPlayer.actualTime.subscribe((time) => {
      this.actuallValue = time;
    });
    this.isPausedSub = this.musicPlayer.isPaused.subscribe(
      (isPaused) => (this.isPaused = isPaused)
    );
    this.trackSub = this.musicPlayer.trackData.subscribe((track) => {
      this.track = track;
      console.log(track)
    });
    this.trackDuration = this.musicPlayer.trackDuration.subscribe(duration => {
      this.maxValue = duration;
    })
  }

  volumeInput(newValue : number){
    this.musicPlayer.setVolume(newValue);
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
    this.actuallTimeSub = this.musicPlayer.actualTime.subscribe(
      (time) => (this.actuallValue = time)
    );
  }
  valueInput(s) {
    this.actuallTimeSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.actuallTimeSub.unsubscribe();
    this.isPausedSub.unsubscribe();
    this.trackSub.unsubscribe();
  }
}
