import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { songInfo } from 'src/app/shared/models/songInfo.model';
import { RecommendService } from 'src/app/shared/services/services/recommend.service';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit, OnDestroy {
  private recommendSub: Subscription;
  recommendSongs: songInfo[];

  constructor(private recommendService: RecommendService) {}

  ngOnInit(): void {
    this.recommendSongs = this.recommendService.recommendSongs;
    this.recommendSub = this.recommendService.recommendChanged.subscribe(
      (data) => {
        this.recommendSongs = data;
      }
    );
  }

  ngOnDestroy() {
    this.recommendSub.unsubscribe();
  }
}
