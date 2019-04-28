import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest/rest.service';
import { Globals } from '../../utils/globals';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookie: CookieService, private rest: RestService, private global: Globals) { }

  readonly endpointLogin = 'login';

  login(username: string, password: string) {
    let json = { username: username, password: password };
    return this.rest.httpPost(this.endpointLogin, json).subscribe(
      res => {
        console.log(res);
        this.rest.setNewHeader('Authorization', res.token);
        this.global.loggedIn = true;
        this.global.username = username;
        this.cookie.setCookie("username", username, 2);
        this.cookie.setCookie("Authorization", res.token, 2);
      },
      err => {
        console.log("Error occured: ", err);
      }
    );
  }

  logout() {
    this.rest.setDefaultHeader();
    this.global.username = "";
    this.global.loggedIn = false;
  }

  checkLoginTokenInCookies() {
    let username = this.cookie.getCookie("username");
    let token = this.cookie.getCookie("Authorization");
    if (token) {
      this.rest.setNewHeader('Authorization', token);
      this.global.loggedIn = true;
      this.global.username = username;
    }
  }
}
