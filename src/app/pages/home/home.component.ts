import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthGuardService } from 'src/app/security/AuthGuard';
import { HeaderVisibleService } from 'src/app/services/header-visible.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  isLogin = false;
  name: string;
  visible = true;
  private headerSub: Subscription;
  private isLoginSub: Subscription;
  constructor(
    private authService: LoginService,
    private headerVisible: HeaderVisibleService,
    private userInfo: UserService
  ) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    if (this.isLogin) {
      this.getUserName();
    }
    this.isLoginSub = this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
      this.getUserName();
    });

    this.headerVisible.status.emit(false);
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible;
    });
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

  ngOnDestroy() {
    this.headerVisible.status.emit(true);
    if (this.headerSub) {
      this.headerSub.unsubscribe();
    }
    if (this.isLoginSub) {
      this.isLoginSub.unsubscribe();
    }
  }
}
