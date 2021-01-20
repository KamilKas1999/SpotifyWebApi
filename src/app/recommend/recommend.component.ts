import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from '../shared/songInfo.model';
import { RecommendService } from './recommend.service';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit, OnDestroy {

  recommendSub: Subscription;
  recommendSongs: songInfo[];
  constructor(private recommendService: RecommendService) { }


  ngOnInit(): void {
    this.recommendSongs = this.recommendService.recommendSongs;
    if (this.recommendSongs.length == 0) {
      this.recommendService.getRecommend();
    }
    this.recommendSub = this.recommendService.recommendChanged.subscribe(data => {
      this.recommendSongs = data;
    })
  }

  ngOnDestroy() {
    this.recommendSub.unsubscribe();
  }

  onRecommend() {
    this.recommendService.getRecommend();
  }

}
