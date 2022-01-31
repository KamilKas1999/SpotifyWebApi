import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { RecommendService } from 'src/app/modules/recommend/services/recommend.service';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { PlayListCreatorService } from 'src/app/modules/shared/services/PlalistCreatorService/play-list-creator-service.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  advancedVisible = false;
  primaryVisible = true;
  isLoading: boolean = false;
  addedValues = [];

  @Output() newItemEvent = new EventEmitter<never>();
  @Input('tracks') tracks: SongInfo[];


  constructor(
    private recommendService: RecommendService,
    private playlistService: PlayListCreatorService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.addedValues = this.recommendService.added;
    console.log(this.addedValues);
    console.log(this.tracks);
    this.recommendService.isLoadingEmmiter.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  onRecommend() {
    this.newItemEvent.emit();
    this.recommendService.getRecommend().subscribe();
  }

  onCreatePlaylist() {
    console.log(this.tracks)
    this.playlistService
      .createPlaylist()
      .subscribe((response) =>
        this.playlistService
          .addTracksToPlaylist(this.tracks, response.id)
          .subscribe((response) =>
            this.messageService.sendMessage(
              'Nowa playlista została utworzona!',
              ''
            )
          )
      );
  }
}
