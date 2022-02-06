import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { RecommendService } from '../../services/recomendation/recommend.service';
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit, OnDestroy {
  private recommendSub: Subscription;
  recommendSongs: SongInfo[];
  constructor(private recommendService: RecommendService) {}
  @Input() isLoading = false;
  ngOnInit(): void {
    this.recommendSongs = this.recommendService.getRecommendSongs();
    this.recommendSub = this.recommendService.recommendChanged.subscribe(
      (data) => {
        this.recommendSongs = data;
        this.isLoading = false;
      }
    );
  }

  startLoading(): void {
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.recommendSub.unsubscribe();
  }
}
