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
  authenticate(): Observable<any> {
    var request = '/S2VAPI/authenticate';
    var header = new HttpHeaders()
      .set('user', 'S2VTournament')
      .set('password', 'sogetispain');
    //console.log(header);
    return this._http.post(this.url + request, null, {
      headers: header,
    });
  }
  getUsers(): Observable<any> {
    var request = '/S2VAPI/users';
    var header = new HttpHeaders().set('access-token', Global.token);
    return this._http.get(this.url + request, { headers: header });
  }
  getJobs(): Observable<any> {
    var request = '/S2VAPI/jobs';
    var header = new HttpHeaders().set('access-token', Global.token);
    return this._http.get(this.url + request, { headers: header });
  }
}
