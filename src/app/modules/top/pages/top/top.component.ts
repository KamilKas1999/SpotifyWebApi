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
  topArtists: Artist[];

  constructor(private spotifyTopService: SpotifyTopService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.spotifyTopService.getTopTracks().subscribe((data) => {
      this.topTracks = data.items;
      this.isLoading = false;
    });
    this.spotifyTopService.getTopArtists().subscribe((data) => {
      this.topArtists = data.items;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {}
}
