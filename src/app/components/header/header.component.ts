import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/models/userData.model';
import { LoginService } from 'src/app/services/authenticate/login.service';
import { SpotifyMusicPlayerService } from 'src/app/services/spotify-music-player/spotify-music-player.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  private userSub: Subscription;
  private headerSub: Subscription;
  visible = true;
  isOpen = false;
  positionY = window.scrollY;
  name: string;
  avatar: string;
  user: UserData;
  product: string;
  connected = false;
  constructor(
    private authService: LoginService,
    private userService: UserService,
    private spotifyPlayerService: SpotifyMusicPlayerService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.isLogin = true;
      this.getUserData();
    }
    this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
      if (isLogin) {
        this.getUserData();
      }
    });
    this.spotifyPlayerService.currentStateEmitter.subscribe(
      (state) => (this.connected = !!state)
    );
  }

  getUserData() {
    this.userService.getUserInfo().subscribe((data) => {
      this.name = data.display_name.substr(0, data.display_name.indexOf(' '));
      this.product = data.product;
      this.avatar = data.images[0].url;
      if (this.product == 'premium') {
        setTimeout(() => this.connectDevice(), 2000);
      }
    });
  }
  connectDevice() {
    this.spotifyPlayerService.initPlayer();
  }
  hideNavigation() {
    this.isOpen = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.headerSub.unsubscribe();
  }

  onLogin() {
    this.authService.showWindowlogin();
    this.isOpen = false;
  }

  onShow() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    this.authService.logout(false);
    this.isOpen = false;
  }
}
