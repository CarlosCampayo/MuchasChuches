import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from './services/global';
import { HackatonService } from './services/hackaton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'muchaschuchessogeti';
  public valido: Boolean;
  private userDefecto: String;
  private passwordDefecto: String;
  @ViewChild('cajauser') cajauser: ElementRef;
  @ViewChild('cajapassword') cajapassword: ElementRef;
  constructor(
    private _servicioHackaton: HackatonService,
    private _router: Router
  ) {
    this.cajauser = ElementRef.prototype;
    this.cajapassword = ElementRef.prototype;
    this.valido = false;
    this.userDefecto = 'S2VTournament';
    this.passwordDefecto = 'sogetispain';
  }
  autenticarse = () => {
    var user = this.cajauser.nativeElement.value;
    var password = this.cajapassword.nativeElement.value;
    this._servicioHackaton.authenticate(user, password).subscribe(
      (res) => {
        //console.log(res);
        Global.token = res.token;
        this.valido = true;
        this._router.navigate(['/users']);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  ngOnInit(): void {
    if (Global.token != '') {
      this.valido = true;
      console.log(this.valido);
    }
  }
}
