import { Component, Input, OnInit } from '@angular/core';
import { songInfo } from '../../shared/songInfo.model';

@Component({
  selector: 'app-top-element',
  templateUrl: './top-element.component.html',
  styleUrls: ['./top-element.component.scss']
})
export class TopElementComponent implements OnInit {

  @Input() track: songInfo;
  imageUrl: string;

  constructor() {}

  ngOnInit(): void {
    this.imageUrl = this.track.album.images[1].url;

  }

}
