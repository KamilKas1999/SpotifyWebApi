import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { RecommendService } from 'src/app/modules/recommend/services/recommend.service';
import { PlayListCreatorService } from 'src/app/modules/shared/services/PlalistCreatorService/play-list-creator-service.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit, OnDestroy {
  private recommendSub: Subscription;
  recommendSongs: SongInfo[];
  constructor(
    private recommendService: RecommendService,
    private playlistService: PlayListCreatorService,
    private messageService : MessageService
  ) {}
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

  onCreatePlaylist() {
    this.playlistService
      .createPlaylist()
      .subscribe((response) =>
        this.playlistService
          .addTracksToPlaylist(this.recommendSongs, response.id)
          .subscribe(response => this.messageService.sendMessage("Nowa playlista została utworzona!",""))
      );
  }
}
