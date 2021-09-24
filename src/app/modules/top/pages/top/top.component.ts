import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from 'src/app/modules/shared/models/songInfo.model';
import { SpotifyTopService } from 'src/app/modules/top/services/spotify-top.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit, OnDestroy {
  isLoading = false;
  topTracks: songInfo[];
  private topSub: Subscription;

  constructor(
    private spotifyTopService: SpotifyTopService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.topSub = this.spotifyTopService.getTopTracks().subscribe((data) => {
      this.topTracks = data.items;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.topSub.unsubscribe();
  }
}
