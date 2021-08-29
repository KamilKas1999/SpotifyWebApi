import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/services/login.service';
import { User } from 'src/app/shared/models/user.model';
import { HeaderVisibleService } from '../../shared/services/services/header-visible.service';
import { UserService } from 'src/app/shared/services/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin = false;
  loading = false;
  user: User;
  name: string;
  visible = true;
  private userSub: Subscription;
  private headerSub: Subscription;
  private userDataSub: Subscription;
  constructor(
    private authService: LoginService,
    private headerVisible: HeaderVisibleService,
    private userInfo: UserService
  ) {}

  ngOnInit(): void {
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

  private getUserName() {
    this.userDataSub = this.userInfo.getUserInfo().subscribe((data) => {
      this.name = data.display_name;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.headerVisible.status.emit(true);
    this.userSub.unsubscribe();
    this.headerSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }
}
