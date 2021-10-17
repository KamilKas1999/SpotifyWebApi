import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}

  code: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params.code;
    });
    this.loginService.getloginToken(this.code).subscribe(() => {
      this.router.navigate(['/']);

    });
  }
}
