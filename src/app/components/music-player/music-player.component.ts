import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from 'src/app/shared/services/services/music-player.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  minValue = 0;
  maxValue = 0;
  actuallValue = 0;
  constructor(private musicPlayer: MusicPlayerService) {}

  ngOnInit(): void {
    this.musicPlayer.status.subscribe((time) => {
      this.actuallValue = time;
    });
    this.musicPlayer.maxTime.subscribe((time) => {
      this.maxValue = time;
    });
  }

  valueChange(s) {
    console.log(s)
    this.musicPlayer.setTime(s);
  }

  onPauseMusic(): void {
    this.musicPlayer.pause();
  }
}
