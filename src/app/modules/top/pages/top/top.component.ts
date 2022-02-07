import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { SpotifyTopService } from 'src/app/modules/shared/services/user-top/spotify-top.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit, OnDestroy {
  isLoading = false;
  topTracks: SongInfo[];

  constructor(private spotifyTopService: SpotifyTopService) {}

  ngOnInit(): void {
  this.getTopTracks('medium_term')
  
  }

  getTopTracks(timeRange: string):void{
    this.isLoading = true;
    this.spotifyTopService.getTopTracks(timeRange).subscribe((data) => {
      this.topTracks = data.items;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {}
}
