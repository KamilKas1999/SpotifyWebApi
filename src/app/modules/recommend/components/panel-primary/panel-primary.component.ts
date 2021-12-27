import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyTopService } from 'src/app/modules/top/services/spotify-top.service';
import { ArtistShort } from '../../models/artistShort.model';
import { PrimarySettings } from '../../models/primarySettings.model';
import { TrackShort } from '../../models/trackShort.model';
import { DataPreparingService } from '../../services/data-preparing.service';
import { RecommendService } from '../../services/recommend.service';

@Component({
  selector: 'app-panel-primary',
  templateUrl: './panel-primary.component.html',
  styleUrls: ['./panel-primary.component.scss'],
})
export class PanelPrimaryComponent implements OnInit {
  primarySettings: PrimarySettings = new PrimarySettings();
  tracks: TrackShort[] = [];
  track: TrackShort;
  artists: ArtistShort[] = [];
  artist: ArtistShort;
  genres: string[];
  genre: string;

  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService
  ) {}

  emitSettings() {
    this.recommendService.primarySettingsEmmiter.emit(this.primarySettings);
  }

  ngOnInit(): void {
    this.randomSettings();
  }

  randomSettings() {
    this.topsevice.getTopTracks().subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      const randomizeArtist = this.dataPreparing.getRandomArtist(this.artists);
      this.primarySettings.artist = randomizeArtist;
      this.artist = randomizeArtist;
      this.tracks = this.dataPreparing.prepareTracks(data.items);
      let radomizeTrack = this.dataPreparing.getRandomTrack(this.tracks);
      this.primarySettings.track = radomizeTrack;
      this.track = radomizeTrack;
      this.emitSettings();
    });
    this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
      let random = this.dataPreparing.getRandomGenre(this.genres);
      this.primarySettings.genre = random;
      this.genre = random;
      this.emitSettings();
    });
  }
}
