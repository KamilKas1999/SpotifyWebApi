import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogin = false;
  private userSub: Subscription;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLogin = !!user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  title = 'SpotifyAppByKamilKasprzak';
}
