import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';
import { User } from 'src/app/shared/user.model';
import { HeaderVisibleService } from '../shared/header-visible.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogin = false;
  private userSub: Subscription;
  user: User;
  name: string;
  visible = true;
  constructor(private authService: LoginService, private http: HttpClient, private headerVisible: HeaderVisibleService) { }
  private headerSub : Subscription


  ngOnInit(): void {
    this.headerVisible.status.emit(false);
    this.userSub = this.authService.user.subscribe(user => {
      this.isLogin = !!user;
      if (this.isLogin) {
        this.user = user
        this.getUserName();
      }
    });
    this.headerSub = this.headerVisible.status.subscribe((visible : boolean) => {
      this.visible = visible
    }
    )
  }



  ngOnDestroy() {
    this.headerVisible.status.emit(true);
    this.userSub.unsubscribe();
    this.headerSub.unsubscribe();
  }

  private getUserName() {
    this.http.get<{ display_name: string }>('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.user.token })
    }).subscribe(data => {
      console.log(data)
      this.name = data.display_name;
    })
  }
}
