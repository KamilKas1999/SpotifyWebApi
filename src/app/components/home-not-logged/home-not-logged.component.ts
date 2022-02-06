import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/authenticate/login.service';

@Component({
  selector: 'app-home-not-logged',
  templateUrl: './home-not-logged.component.html',
  styleUrls: ['./home-not-logged.component.scss'],
})
export class HomeNotLoggedComponent implements OnInit {
  constructor(private authService: LoginService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.showWindowlogin();
  }
}
