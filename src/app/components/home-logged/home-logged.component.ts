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
  isLoading = false;
  name: string;
  artists: SongInfo[];
  firstImageSrc: string;
  secondImageSrc: string;
  thirdImageSrc: string;

  constructor(
    private userInfo: UserService,
    private authService: LoginService,
    private topAlbumsService: SpotifyTopAlbumsService
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.getTopAlbums();
  }

  onLogout() {
    this.authService.logout(false);
  }

  private getUserName() {
    this.isLoading = true;
    this.userInfo.getUserInfo().subscribe(
      (data) => {
        this.name = data.display_name;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  private getTopAlbums(): void {
    this.topAlbumsService.getTopAlbums().subscribe((data) => {
      this.firstImageSrc = data.items[0].images[0].url;
      this.secondImageSrc = data.items[1].images[0].url;
      this.thirdImageSrc = data.items[2].images[0].url;
    });
  }
  ngOnDestroy() {}
}
