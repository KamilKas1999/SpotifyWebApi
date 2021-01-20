import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from '../shared/songInfo.model';
import { SpotifyTopService } from './spotify-top.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  topTracks: songInfo[];
  topSub: Subscription;

  constructor(private spotifyTopService: SpotifyTopService) { }

  ngOnInit(): void {
    this.topTracks = this.spotifyTopService.topTracks;
    if (this.topTracks.length == 0) {
      this.spotifyTopService.getTopTracks();
    }
    this.topSub = this.spotifyTopService.topArrive.subscribe(data => {
      this.topTracks = data;
    })
  }

}
