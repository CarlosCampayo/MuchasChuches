import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root',
})
export class HackatonService {
  private url: string;
  constructor(public _http: HttpClient) {
    this.url = Global.urlsogeti;
  }
  // 'S2VTournament'
  // 'sogetispain'
  authenticate(user, password): Observable<any> {
    var request = '/S2VAPI/authenticate';
    var header = new HttpHeaders().set('user', user).set('password', password);
    //console.log(header);
    return this._http.post(this.url + request, null, {
      headers: header,
    });
  }

  getUsers(): Observable<any> {
    var request = '/S2VAPI/users';
    var src = './../../assets/json/user_dummy2.json';
    var header = new HttpHeaders().set('access-token', Global.token);
     return this._http.get(this.url + request, { headers: header });
    //return this._http.get(src);
  }
  getJobs(): Observable<any> {
    var request = '/S2VAPI/jobs';
    var src = './../../assets/json/jobs_dummy_1.json';
    var header = new HttpHeaders().set('access-token', Global.token);
     return this._http.get(this.url + request, { headers: header });
    //return this._http.get(src);
  }
}
