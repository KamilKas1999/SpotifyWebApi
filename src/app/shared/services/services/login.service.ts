import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { environment } from '../../../../environments/environment'
export interface TokenData {
    access_token: string,
    token_type: string,
    scope: string,
    expire_in: number,
    refresh_token: string
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    user = new BehaviorSubject<User>(null);

    private access_token: string;
    private token_type: string;
    private scope: string;
    private expire_in: number;
    private refresh_token: string;


    constructor(private http: HttpClient, private router: Router) { }

    showWindowlogin() {
        let scope = environment.spotifyApp.scope;
        let redirect = encodeURIComponent(environment.spotifyApp.redirect_uri);
        window.location.href =
            'https://accounts.spotify.com/authorize?client_id=' + environment.spotifyApp.client_id + '&response_type=code&redirect_uri=' + redirect + '&scope=' + scope + "&show_dialog=true"
     
        }
    


    getloginToken(code: string) {

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        let params = new HttpParams({
            fromObject: {
                code: code,
                redirect_uri: environment.spotifyApp.redirect_uri,
                grant_type: 'authorization_code',
                client_id: environment.spotifyApp.client_id,
                client_secret: environment.spotifyApp.client_secret,
            },
        });

        return this.http.post<TokenData>(
            'https://accounts.spotify.com/api/token', params, options).pipe(tap(resData => {
                this.handleAuthentication(resData.access_token, resData.token_type, resData.scope, resData.expire_in, resData.refresh_token)
            }))

    }

    private handleAuthentication(
        access_token: string,
        token_type: string,
        scope: string,
        expire_in: number,
        refresh_token: string) {
        const user = new User(access_token, token_type, scope, expire_in, refresh_token);
        this.user.next(user);
        this.router.navigate(['/']);

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/']);
    }




}