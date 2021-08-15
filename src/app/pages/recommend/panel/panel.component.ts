import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { artistShort } from 'src/app/shared/models/artistShort.model';
import { trackShort } from 'src/app/shared/models/trackShort.model';
import { DataPreparingService } from 'src/app/shared/services/services/data-preparing.service';
import { RecommendService } from 'src/app/shared/services/services/recommend.service';
import { SpotifyTopService } from 'src/app/shared/services/services/spotify-top.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) signupForm: NgForm;
  tracksNameList: trackShort[] = [];
  artists: artistShort[] = [];
  selectedArtist: artistShort = { name: '', id: '' };
  selectedGenres = '';
  selectedTrack: trackShort = { name: '', id: '' };
  genres: string[];
  private topSub: Subscription;
  private genresSub: Subscription;

  constructor(private recommendService: RecommendService,
    private topsevice: SpotifyTopService,
    private dataPreparing: DataPreparingService) { }

  ngOnInit(): void {
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

  onRecommend() {
    const genre = this.signupForm.value.genres;
    const track = this.signupForm.value.tracks;
    const artist = this.signupForm.value.artists;
    this.recommendService.getRecommend(artist, genre, track);
  }
  ngOnDestroy() {
    this.topSub.unsubscribe();
    this.genresSub.unsubscribe();
  }

}
