import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SpotifyTopService } from 'src/app/modules/shared/services/user-top/spotify-top.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  isLoading = false;
  topArtists: Artist[] = [];
  activeButtonNumber = 1;

  constructor(private spotifyTopService: SpotifyTopService) {}

  ngOnInit(): void {
    this.getTopArtists('medium_term');
  }

  getTopArtists(timeRange: string) {
    if (timeRange == 'long_term') {
      this.activeButtonNumber = 0;
    } else if (timeRange == 'medium_term') {
      this.activeButtonNumber = 1;
    } else if (timeRange == 'short_term') {
      this.activeButtonNumber = 2;
    }
    this.isLoading = true;
    this.spotifyTopService.getTopArtists(timeRange).subscribe((data) => {
      this.topArtists = data.items;
      this.isLoading = false;
    });
  }
}
