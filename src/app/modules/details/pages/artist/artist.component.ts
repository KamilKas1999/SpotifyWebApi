import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { ArtistService } from '../../../shared/services/artist/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  trackId: string;
  artist: Artist;
  topArtistTrack: SongInfo[];
  isLoading = true;
  isLoadingTopTracks = true;
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.trackId = params['id'];
    });
    this.getArtist();
    this.getArtistTopTracks();
  }

  getArtist() {
    this.isLoading = true;
    this.artistService.getArtist(this.trackId).subscribe((data) => {
      this.artist = data;
      this.isLoading = false;
    });
  }
  getArtistTopTracks() {
    this.isLoadingTopTracks = true;
    this.artistService.getTopArtistTracks(this.trackId).subscribe((data) => {
      console.log(data)
      this.topArtistTrack = data.tracks;
      this.isLoadingTopTracks = false;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
