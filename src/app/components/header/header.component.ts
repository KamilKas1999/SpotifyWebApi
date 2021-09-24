import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { HeaderVisibleService } from '../../services/header-visible.service';


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
  isOpen = false;

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

  hideNavigation(){
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

  onShow(){
     this.isOpen = !this.isOpen;
  }


  onLogout() {
    this.authService.logout();
    this.isOpen = false;
  }
}
