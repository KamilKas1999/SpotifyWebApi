import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { songInfo } from '../shared/models/songInfo.model';
import { SpotifyTopService } from '../shared/services/services/spotify-top.service';
import { RecommendService } from '../shared/services/services/recommend.service';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit, OnDestroy {
 @ViewChild('form', { static: false }) signupForm: NgForm;
  private recommendSub: Subscription;
  private topSub: Subscription;
  recommendSongs: songInfo[];
  mapArtist = new Map<string, number>();
  selected = "";
  constructor(private recommendService: RecommendService, private topsevice : SpotifyTopService) { }


  ngOnInit(): void {
    this.recommendSongs = this.recommendService.recommendSongs;
    this.recommendSub = this.recommendService.recommendChanged.subscribe(data => {
      this.recommendSongs = data;
    })
    this.topSub = this.topsevice.getTopTracks().subscribe(data =>{
      this.mapArtist = this.prepareArtist(data.items);
    })
  }

  
  prepareArtist(top: songInfo[]) : Map<string, number> {
    const mapArtist = new Map<string, number>();
    for (let el of top) {
      for (let artist of el.artists) {
        let value = mapArtist.get(artist.name);
        if (!value) {
          value = 0;
        }
        mapArtist.set(artist.name, value + 1);
      }
    }
    return mapArtist;
  }

  ngOnDestroy() {
    this.recommendSub.unsubscribe();
    this.topSub.unsubscribe();
  }

  onRecommend() {
    this.recommendService.getRecommend();
  }

}
