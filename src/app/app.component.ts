import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/authenticate/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogin = false;

  constructor(private authService: LoginService) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  title = 'SpotifyAppByKamilKasprzak';
}
