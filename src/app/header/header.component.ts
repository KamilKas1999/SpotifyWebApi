import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';
import { HeaderVisibleService } from '../shared/header-visible.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  private userSub: Subscription;
  private headerSub: Subscription;
  visible = true;

  constructor(private authService: LoginService, private headerVisible: HeaderVisibleService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLogin = !!user;
    });
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible
    }
    )
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.headerSub.unsubscribe();
  }

  onLogin() {
    this.authService.showWindowlogin();
  }



  onLogout() {
    this.authService.logout();
  }
}
