import { Component, Input, OnInit } from '@angular/core';
import { songInfo } from '../../shared/models/songInfo.model';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
})
export class MusicCardComponent implements OnInit {
  @Input() track: songInfo;
  imageUrl: string;

  constructor() {}

  ngOnInit(): void {
    this.imageUrl = this.track.album.images[1].url;
  }
}
