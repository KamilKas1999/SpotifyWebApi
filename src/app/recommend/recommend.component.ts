import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { songInfo } from '../shared/models/songInfo.model';
import { SpotifyTopService } from '../shared/services/services/spotify-top.service';
import { RecommendService } from '../shared/services/services/recommend.service';
import { DataPreparingService } from '../shared/services/services/data-preparing.service';
import { genre } from '../shared/models/genre.model';
import { artistShort } from '../shared/models/artistShort.model';
import { trackShort } from '../shared/models/trackShort.model';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) signupForm: NgForm;
  private recommendSub: Subscription;
  private topSub: Subscription;
  private genresSub: Subscription;
  genres: string[];
  recommendSongs: songInfo[];
  tracksNameList: trackShort[] = [];
  artists: artistShort[] = [];
  selectedArtist: artistShort = { name: '', id: '' };
  selectedGenres = '';
  selectedTrack: trackShort = { name: '', id: '' };
  constructor(
    private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService
  ) {}

  ngOnInit(): void {
    this.recommendSongs = this.recommendService.recommendSongs;
    this.recommendSub = this.recommendService.recommendChanged.subscribe(
      (data) => {
        this.recommendSongs = data;
      }
    );
    this.topSub = this.topsevice.getTopTracks().subscribe((data) => {
      this.artists = this.dataPreparing.prepareArtist(data.items);
      this.selectedArtist = this.dataPreparing.getRandomArtist(this.artists);
      this.tracksNameList = this.dataPreparing.prepareTracks(data.items);
      this.selectedTrack = this.dataPreparing.getRandomTrack(
        this.tracksNameList
      );
    });
    this.genresSub = this.dataPreparing.getGenres().subscribe((data) => {
      this.genres = data.genres;
      this.selectedGenres = this.dataPreparing.getRandomGenre(this.genres);
    });
  }

  ngOnDestroy() {
    this.recommendSub.unsubscribe();
    this.topSub.unsubscribe();
    this.genresSub.unsubscribe();
  }

  onRecommend() {
    const genre = this.signupForm.value.genres;
    const track = this.signupForm.value.tracks;
    const artist = this.signupForm.value.artists;
    this.recommendService.getRecommend(artist, genre, track);
  }
}
