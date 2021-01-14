import { Component, Input, OnInit } from '@angular/core';
import { songInfo } from '../songInfo/songInfo.model';

@Component({
  selector: 'app-top-element',
  templateUrl: './top-element.component.html',
  styleUrls: ['./top-element.component.css']
})
export class TopElementComponent implements OnInit {

  @Input() songInfo: songInfo;
  imageUrl: string;

  constructor() {}

  ngOnInit(): void {
    this.imageUrl = this.songInfo.album.images[1].url;

  }

}
