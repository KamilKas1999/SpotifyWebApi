import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyTopService } from 'src/app/modules/top/services/spotify-top.service';
import { isThisTypeNode } from 'typescript';
import { threadId } from 'worker_threads';
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
  artists: ArtistShort[] = [];
  genres: string[];
  added: any[];
  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService
  ) {}

  ngOnInit(): void {
    this.randomSettings();
    this.added = this.recommendService.added;
  }

  onAdd(o) {
    if (this.added.some((e) => e == o) || this.added.length >= 5) {
      return;
    }
    this.added.push(o);
  }

  onRemove(i: number) {
    this.added.splice(i, 1);
  }

  randomSettings() {
    this.topsevice.getTopTracks().subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      this.tracks = this.dataPreparing.prepareTracks(data.items);
    });
    this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }
}
