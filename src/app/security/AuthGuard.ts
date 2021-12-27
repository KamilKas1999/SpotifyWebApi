import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogin()) {
      return true;
    }
    this.authService.logout(true);
    return false;
  }
}
