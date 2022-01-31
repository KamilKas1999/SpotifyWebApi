import { Component, OnDestroy, OnInit } from '@angular/core';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { LoginService } from 'src/app/services/login.service';
import { SpotifyTopAlbumsService } from 'src/app/services/spotify-top-albums.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss'],
})
export class HomeLoggedComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
