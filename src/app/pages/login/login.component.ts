import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderVisibleService } from 'src/app/services/header-visible.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  visible = false;
  private headerSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private headerVisible: HeaderVisibleService
  ) {}

  code: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params.code;
    });
    this.loginService.getloginToken(this.code).subscribe(() => {
      this.router.navigate(['/']);
    });
    this.headerVisible.status.emit(false);
    this.headerSub = this.headerVisible.status.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  ngOnDestroy(): void {
    this.headerSub.unsubscribe();
  }
}
