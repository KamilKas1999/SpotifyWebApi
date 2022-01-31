import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyTopService } from 'src/app/modules/top/services/spotify-top.service';
import { ArtistShort } from '../../models/artistShort.model';
import { PrimarySettings } from '../../models/primarySettings.model';
import { TrackShort } from '../../models/trackShort.model';
import { DataPreparingService } from '../../services/data-preparing.service';
import { RecommendService } from '../../services/recommend.service';
import { SearchService } from '../../services/searchService/search.service';

@Component({
  selector: 'app-panel-primary',
  templateUrl: './panel-primary.component.html',
  styleUrls: ['./panel-primary.component.scss'],
})
export class PanelPrimaryComponent implements OnInit {
  primarySettings: PrimarySettings = new PrimarySettings();
  tracks: TrackShort[] = [];
  artists: ArtistShort[] = [];
  genres: string[];
  added: any[];
  showModal: boolean = false;
  artistSearchResult = [];
  trackSearchResult = [];
  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.randomSettings();
    this.added = this.recommendService.added;
  }

  onAdd(o) {
    this.clearSearched();
    if (this.added.some((e) => e == o) || this.added.length >= 5) {
      return;
    }
    this.added.push(o);
  }

  onRemove(i: number) {
    this.added.splice(i, 1);
  }

  onAddMore() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
  }

  search(value: string) {
    if (value.length <= 3) {
      this.clearSearched();
      return;
    }
    this.searchService.search(value).subscribe((data) => {
      this.trackSearchResult = data.tracks.items.map(
        (track) => new TrackShort(track.name, track.id)
      );
      this.artistSearchResult = data.artists.items.map(
        (artist) => new ArtistShort(artist.name, artist.id)
      );
    });
  }
  private clearSearched() {
    this.trackSearchResult = [];
    this.artistSearchResult = [];
  }

  randomSettings() {
    this.topsevice.getTopTracks().subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      this.tracks = this.dataPreparing.prepareTracks(data.items);
      if (this.added.length == 0) {
        this.added.push(
          this.tracks[Math.floor(Math.random() * this.tracks.length)]
        );
        this.added.push(
          this.artists[Math.floor(Math.random() * this.artists.length)]
        );
      }
    });
    this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }
}
