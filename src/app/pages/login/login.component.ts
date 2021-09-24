import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  code: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.code = params.code;
      }
    )
    this.loginService.getloginToken(this.code).subscribe(() => {
    });

  }




}
