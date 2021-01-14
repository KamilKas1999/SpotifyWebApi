import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  private userSub: Subscription;
  
  constructor(private authService: LoginService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLogin = !!user;
    });
  }

  onLogin() {
    this.authService.login();
  }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
