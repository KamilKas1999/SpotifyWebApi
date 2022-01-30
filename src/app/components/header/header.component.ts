import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderVisibleService } from 'src/app/services/header-visible.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private authService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.userService.userEmitter.subscribe(data => {
    //   this.avatar = data.images[0].url;
    //   this.name = data.name;
    // })
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
  }

  getUserData(){
    this.userService.getUserInfo().subscribe((data) => {
      this.name = data.display_name.substr(0, data.display_name.indexOf(' '));
      this.avatar = data.images[0].url;
    });
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

  onBackToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;

      if (pos > 0) {
        window.scrollTo(0, pos - 200);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
