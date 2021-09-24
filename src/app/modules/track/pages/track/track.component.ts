import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { songInfo } from 'src/app/modules/shared/models/songInfo.model';
import { trackFeature } from 'src/app/modules/track/models/trackFeature.model';
import { TrackFeaturesService } from 'src/app/modules/track/services/track-features.service';
import { TrackService } from '../../services/track.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  trackId: string;
  track: songInfo;
  trackFeature: trackFeature;
  loadingTrack = true;
  loadingTrackFeatures = true;

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private trackFeaturesService: TrackFeaturesService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.trackId = params['id'];
    });
    this.trackService.getTrack(this.trackId).subscribe((data) => {
      this.track = data;
      this.loadingTrack = false;
    });
    this.trackFeaturesService
      .getFeaturesForTrack(this.trackId)
      .subscribe((data) => {
        this.trackFeature = data;
        this.loadingTrackFeatures = false;
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
