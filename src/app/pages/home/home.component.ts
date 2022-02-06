import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/authenticate/login.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {

    this.isLogin = this.authService.isLogin();
    if(this.isLogin){
      this.goToRecommend();
    }
    this.isLoginSub = this.authService.loginEmitter.subscribe((isLogin) => {
      this.isLogin = isLogin;
      if(this.isLogin){
        this.goToRecommend();
      }
    });
    
  }

  goToRecommend(){
      this.router.navigate(['recommend']);
  }
  ngOnDestroy(): void {
    if (this.isLoginSub) {
      this.isLoginSub.unsubscribe();
    }
  }
}
