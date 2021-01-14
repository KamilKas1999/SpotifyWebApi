import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/login.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin = false;
  private userSub: Subscription;
  user: User;
  name: string;

  constructor(private authService: LoginService, private http: HttpClient) { }



  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isLogin = !!user;
      if (this.isLogin) {
        this.user = user
        this.getUserName();
      }
    });
  }

  onLogin() {
    this.authService.login();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  private getUserName() {
    this.http.get<{display_name : string}>('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.user.token })
    }).subscribe( data => {
      console.log(data)
      this.name = data.display_name;
    })
  }
}
