import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderVisibleService } from 'src/app/services/header-visible.service';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(
    private authService: LoginService,
    private headerVisible: HeaderVisibleService
  ) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
    });
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible;
    });
    setInterval(() => {
      this.positionY = window.scrollY;
    },1000)
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
    this.authService.logout();
    this.isOpen = false;
  }

  onBackToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
    
      if (pos > 0) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
