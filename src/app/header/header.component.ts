import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(private authService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin() {
    let t = this.authService.login();
    console.log(t);
  }

}
