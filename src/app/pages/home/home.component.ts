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
  visible = false;
  private headerSub: Subscription;
  private isLoginSub: Subscription;
  isLogin = false;
  constructor(
    private authService: LoginService,
    private headerVisible: HeaderVisibleService
  ) {}

  ngOnInit(): void {
    this.headerVisible.status.emit(false);
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible;
    });
    this.isLogin = this.authService.isLogin();
    this.isLoginSub = this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
  }

  ngOnDestroy(): void {
    this.headerVisible.status.emit(true);
    if (this.headerSub) {
      this.headerSub.unsubscribe();
    }
    if (this.isLoginSub) {
      this.isLoginSub.unsubscribe();
    }
  }
}
