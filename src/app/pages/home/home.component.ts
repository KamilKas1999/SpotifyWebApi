import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/services/login.service';
import { User } from 'src/app/shared/models/user.model';
import { HeaderVisibleService } from '../../shared/services/services/header-visible.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin = false;
  loading = false;
  private userSub: Subscription;
  user: User;
  name: string;
  visible = true;
  constructor(
    private authService: LoginService,
    private http: HttpClient,
    private headerVisible: HeaderVisibleService
  ) {}
  private headerSub: Subscription;

  ngOnInit(): void {
    console.log(this.authService.userData);
    this.headerVisible.status.emit(false);
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLogin = !!user;
      if (this.isLogin) {
        this.loading = true;
        this.user = user;
        this.getUserName();
      }
    });
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  ngOnDestroy() {
    this.headerVisible.status.emit(true);
    this.userSub.unsubscribe();
    this.headerSub.unsubscribe();
  }

  private getUserName() {
    this.http
      .get<{ display_name: string }>('https://api.spotify.com/v1/me', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.user.token,
        }),
      })
      .subscribe((data) => {
        this.name = data.display_name;
        this.loading = false;
      });
  }
}
