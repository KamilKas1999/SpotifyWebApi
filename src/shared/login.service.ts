import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(private http: HttpClient) { }
    login() {


        window.location.href = 'https://accounts.spotify.com/authorize?client_id=c5de057c69af43f78132e18432ab8060&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin%2F'



    }


    loginToken(code: string) {

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        let params = new HttpParams({
            fromObject: {
                code: code,
                redirect_uri: 'http://localhost:4200/login/',
                grant_type: 'authorization_code',
                client_id: 'c5de057c69af43f78132e18432ab8060',
                client_secret: '679bc0f28d7f4478b776c8cdeaac8f0a'
            },
        });

        return this.http.post('https://accounts.spotify.com/api/token', params, options)


    }
}