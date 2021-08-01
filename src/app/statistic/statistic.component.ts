import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { songInfo } from '../shared/models/songInfo.model';
import { SpotifyTopService } from '../shared/services/services/spotify-top.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {

  topTracks: songInfo[];
  private topSub: Subscription;

  constructor(private spotifyTopService: SpotifyTopService) { }


  ngOnInit(): void {
    this.topSub = this.spotifyTopService.getTopTracks().subscribe(
      data => {
        this.topTracks = data.items;
      }
    )
  }

  ngOnDestroy(): void {
    this.topSub.unsubscribe();
  }

}
