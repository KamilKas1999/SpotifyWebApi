import { Component, Input, OnInit } from '@angular/core';
import { songInfo } from 'src/app/shared/songInfo.model';

@Component({
  selector: 'app-recommend-item',
  templateUrl: './recommend-item.component.html',
  styleUrls: ['./recommend-item.component.scss']
})
export class RecommendItemComponent implements OnInit {

  @Input() track : songInfo

  constructor() { }

  ngOnInit(): void {
  }

}
