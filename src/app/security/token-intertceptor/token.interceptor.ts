import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/authenticate/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if(request.url == 'https://accounts.spotify.com/api/token'){
      return next.handle(request)
    }
    if (this.authService.isLogin()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } else if (!request.url.endsWith('getToken')) {
      this.authService.logout(true);
    }
    return next.handle(request);
  }
}
