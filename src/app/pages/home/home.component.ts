import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderVisibleService } from 'src/app/services/header-visible.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  visible = true;
  private isLoginSub: Subscription;
  isLogin = false;
  constructor(
    private authService: LoginService,
  ) {}

  ngOnInit(): void {

    this.isLogin = this.authService.isLogin();
    this.isLoginSub = this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  ngOnDestroy(): void {
    if (this.isLoginSub) {
      this.isLoginSub.unsubscribe();
    }
  }
}
