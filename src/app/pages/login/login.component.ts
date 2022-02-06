import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { LoginService } from 'src/app/services/authenticate/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  visible = true;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
  ) {}

  code: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params.code;
    });
    this.loginService.getloginToken(this.code).subscribe(() => {
      this.router.navigate(['/recommend']);
    });
  }

  ngOnDestroy(): void {
  }
}
