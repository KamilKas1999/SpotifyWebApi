import { Component, Input, OnInit } from '@angular/core';
import { SongInfo } from '../../models/songInfo.model';
import { UserLibraryService } from '../../services/user-library/user-library.service';

@Component({
  selector: 'app-music-card-list',
  templateUrl: './music-card-list.component.html',
  styleUrls: ['./music-card-list.component.scss'],
})
export class MusicCardListComponent implements OnInit {
  @Input('tracks') tracks: SongInfo[];
  @Input('describe') describe = '';
  selectedIndex: number = 0;
  follows: boolean[] = [];
  constructor(private userLibrary: UserLibraryService) {}

  onSelected(index: number) {
    this.selectedIndex = index;
    this.follows
  }

  ngOnInit(): void {
    let ids = this.tracks.map((track) => track.id).join(',');
    this.userLibrary
      .checkUserSavedTrack(ids)
      .subscribe((data) => (this.follows = data));
  }
}
