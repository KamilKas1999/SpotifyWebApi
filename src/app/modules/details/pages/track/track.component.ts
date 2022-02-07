import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from 'src/app/modules/shared/models/artist.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { ArtistService } from 'src/app/modules/shared/services/artist/artist.service';
import { trackFeature } from '../../models/trackFeature.model';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  trackId: string;
  track: SongInfo;
  trackFeature: trackFeature;
  loadingTrack = true;
  loadingTrackFeatures = true;
  loadingTrackFArtists = true;
  artists: Artist[];

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.trackId = params['id'];
    });
    this.trackService.getTrack(this.trackId).subscribe(
      (data) => {
        this.track = data;
        this.getSeveralArtists();

        this.loadingTrack = false;
      },
      (error) => (this.loadingTrack = false)
    );
    this.trackService.getFeaturesForTrack(this.trackId).subscribe(
      (data) => {
        this.trackFeature = data;
        this.loadingTrackFeatures = false;
      },
      (error) => (this.loadingTrack = false)
    );
  }

  getSeveralArtists() {
    let ids = this.track.artists.map((artist) => artist.id);
    this.artistService.getSeveralArist(ids).subscribe(
      (data) => {
        this.artists = data.artists;
        this.loadingTrackFArtists = false;
      },
      (error) => (this.loadingTrack = false)
    );
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
