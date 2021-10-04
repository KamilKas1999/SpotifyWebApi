import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: LoginService, public router: Router) {}

  canActivate(): boolean {
    console.log('canActivate');
    if (this.authService.isLogin()) {
      console.log('true');
      return true;
    }
    console.log('false');
    this.authService.logout();
    return false;
  }
}
