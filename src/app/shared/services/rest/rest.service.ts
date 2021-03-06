import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

// FROM: https://www.djamware.com/post/5b87894280aca74669894414/angular-6-httpclient-consume-restful-api-example

const baseURL = 'http://localhost:3000/api/';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json');
let options = { headers: headers };

const endpointLogin = 'login';
const endpointEditUser = 'user/';
const endpointAddUser = 'add';
//editroom
const endpointEditRoom ='room/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  //editRoom
  editRoom ( oldtitle:string,title:string, description:string, image:any) {
  let json = {title:title, description:description, image:image};
  console.log(json);
  console.log(JSON.stringify(json));
  return this.httpPut(endpointEditRoom + oldtitle, json);
  }

  editUser(oldusername:string, username:string, password:string) :Observable<any> {
    let json = {username: username, password:password};
    console.log(json);
    console.log(JSON.stringify(json));
    return this.httpPut(endpointEditUser + oldusername, json);
  }

  addUser(username:string, password:string) :Observable<any> {
    let json = {username: username, password:password};
    console.log(json);
    console.log(JSON.stringify(json));
    return this.httpPost(endpointAddUser, json);
  }

  setNewHeader(name:string, value:string) {
    headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set(name, value);
    options = { headers: headers };
    console.log(headers);
  }

  setDefaultHeader(){
    headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    options = { headers: headers };
    console.log(headers);
  }

  httpPost(endpoint:string, json:object) :Observable<any> {
    return this.http.post(baseURL + endpoint, JSON.stringify(json), options);
  }

  httpGet(endpoint:string) :Observable<any> {
    return this.http.get(baseURL + endpoint, options);
  }

  httpPut(endpoint:string, json:object) :Observable<any> {
    return this.http.put(baseURL + endpoint,  JSON.stringify(json), options);
  }

  httpDelete(endpoint:string) :Observable<any> {
    return this.http.delete(baseURL + endpoint, options);
  }
}
