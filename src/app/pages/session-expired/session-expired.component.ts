import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss'],
})
export class SessionExpiredComponent implements OnInit {
  constructor(private authService: LoginService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.showWindowlogin();
  }
}
