import { Component, Input, OnInit } from '@angular/core';
import { SongInfo } from '../../models/songInfo.model';

@Component({
  selector: 'app-music-card-list',
  templateUrl: './music-card-list.component.html',
  styleUrls: ['./music-card-list.component.scss'],
})
export class MusicCardListComponent implements OnInit {
  @Input('tracks') tracks: SongInfo[];
  @Input('describe') describe = ""
  selectedIndex: number = 0;
  constructor() {}

  onSelected(index: number) {
    this.selectedIndex = index;
  }

  ngOnInit(): void {}
}
