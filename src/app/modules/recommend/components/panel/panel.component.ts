import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { artistShort } from 'src/app/modules/recommend/models/artistShort.model';
import { trackShort } from 'src/app/modules/recommend/models/trackShort.model';
import { DataPreparingService } from 'src/app/modules/recommend/services/data-preparing.service';
import { RecommendService } from 'src/app/modules/recommend/services/recommend.service';
import { SpotifyTopService } from 'src/app/modules/top/services/spotify-top.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) signupForm: NgForm;

  advancedVisible = false;
  limit = 5;
  minDuration = null;
  maxDuration = null;
  minTempo = null;
  maxTempo = null;
  minPopularity = null;
  maxPopularity = null;
  artistCheckBox: boolean = true;
  nameCheckBox: boolean = true;
  genreCheckBox: boolean = true;
  tracksNameList: trackShort[] = [];
  artists: artistShort[] = [];
  selectedArtist: artistShort;
  selectedGenres = '';
  selectedTrack: trackShort = { name: '', id: '' };
  genres: string[];

  private topSub: Subscription;
  private genresSub: Subscription;
  @Output() newItemEvent = new EventEmitter<never>();
  isLoadingTop: boolean = false;
  isLoadingGenres: boolean = false;

  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService
  ) {}

  ngOnInit(): void {
    this.isLoadingTop = true;
    this.isLoadingGenres = true;
    this.randomSettings();
  }
  t() {
    console.log(this.signupForm.value.genres);
    console.log(this.selectedGenres);
  }

  randomSettings() {
    this.topSub = this.topsevice.getTopTracks().subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      this.selectedArtist = this.dataPreparing.getRandomArtist(this.artists);
      this.tracksNameList = this.dataPreparing.prepareTracks(data.items);
      this.selectedTrack = this.dataPreparing.getRandomTrack(
        this.tracksNameList
      );
      this.isLoadingTop = false;
    });
    this.genresSub = this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
      this.selectedGenres = this.dataPreparing.getRandomGenre(this.genres);
      this.isLoadingGenres = false;
    });
  }

  onRecommend() {
    this.newItemEvent.emit();
    const genre = this.genreCheckBox ? this.signupForm.value.genres : '';
    const track = this.nameCheckBox ? this.signupForm.value.tracks : '';
    const artist = this.artistCheckBox ? this.signupForm.value.artists : '';
    const limit =
      this.signupForm.value.limit == '' ? 5 : this.signupForm.value.limit;
    const minDuration = this.signupForm.value.minDuration;
    const maxDuration = this.signupForm.value.maxDuration;
    const maxAcousticness = this.signupForm.value.maxAcousticness;
    const minAcousticness = this.signupForm.value.minAcousticness;
    const minTempo = this.signupForm.value.minTempo;
    const maxTempo = this.signupForm.value.maxTempo;
    const maxPopularity = this.signupForm.value.maxPopularity;
    const minPopularity = this.signupForm.value.minPopularity;
    this.recommendService.getRecommend(
      artist,
      genre,
      track,
      limit,
      minDuration,
      maxDuration,
      minAcousticness,
      maxAcousticness,
      minTempo,
      maxTempo,
      minPopularity,
      maxPopularity
    );
  }
  advanceButton() {
    this.advancedVisible = !this.advancedVisible;
  }

  resetAdvanced() {
    this.minDuration = null;
    this.maxDuration = null;
    this.minTempo = null;
    this.maxTempo = null;
    this.minPopularity = null;
    this.maxPopularity = null;
  }
  ngOnDestroy() {
    this.topSub.unsubscribe();
    this.genresSub.unsubscribe();
  }
}
