import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyTopService } from 'src/app/modules/shared/services/user-top/spotify-top.service';
import { ArtistShort } from '../../models/artistShort.model';
import { PrimarySettings } from '../../models/primarySettings.model';
import { TrackShort } from '../../models/trackShort.model';
import { DataPreparingService } from '../../services/data-preparing/data-preparing.service';
import { RecommendService } from '../../services/recomendation/recommend.service';
import { SearchService } from '../../services/search/search.service';

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
  hideComponent = false;
  mode = 0;
  recommendSub: Subscription;

  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.randomSettings();
    this.added = this.recommendService.added;
    this.recommendSub = this.recommendService.recommendChanged.subscribe(() => {this.hideComponent = true})
  }

  onHide() {
    this.hideComponent = !this.hideComponent;
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

  onAddMore(mode: number) {
    this.mode = mode;
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
    this.topsevice.getTopArtists('short_term').subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      if (this.added.length < 3) {
        this.added.push(this.dataPreparing.getRandomArtist(this.artists));
      }
    });
    this.topsevice.getTopTracks('short_term').subscribe((data) => {
      this.tracks = this.dataPreparing.prepareTracks(data.items);
      if (this.added.length < 3) {
        this.added.push(this.dataPreparing.getRandomTrack(this.tracks));
      }
    });
    this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
      if (this.added.length < 3) {
        this.added.push(this.dataPreparing.getRandomGenre(this.genres));
      }
    });
  }
}
