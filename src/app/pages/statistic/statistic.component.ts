import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from 'src/app/shared/models/songInfo.model';
import { SpotifyTopService } from 'src/app/shared/services/services/spotify-top.service';
import { TrackFeaturesService } from 'src/app/shared/services/services/track-features.service';



@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {

  isLoading = false;
  topTracks: songInfo[];
  private topSub: Subscription;

  constructor(private spotifyTopService: SpotifyTopService, private freaturesTacks: TrackFeaturesService) { }


  ngOnInit(): void {
    this.isLoading = true;

    this.topSub = this.spotifyTopService.getTopTracks().subscribe(
      data => {
        this.topTracks = data.items;
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.topSub.unsubscribe();
  }

}
