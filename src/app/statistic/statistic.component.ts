import { Component, OnInit } from '@angular/core';
import { songInfo } from './songInfo/songInfo.model';
import { SpotifyTopService } from './spotify-top.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

topArray : songInfo[];

  constructor(private spotifyTopService: SpotifyTopService) { }

  ngOnInit(): void {
    this.spotifyTopService.getTopTracks().subscribe(stat => {
      this.topArray = stat.items
      console.log(this.topArray)
    });
  }

}
