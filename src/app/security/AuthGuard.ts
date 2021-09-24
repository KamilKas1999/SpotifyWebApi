import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLogin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
