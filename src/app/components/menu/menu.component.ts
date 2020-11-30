import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { HackatonService } from 'src/app/services/hackaton.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private _servicioHackaton: HackatonService) {}
  autenticarse = () => {
    this._servicioHackaton.authenticate().subscribe(
      (res) => {
        //console.log(res);
        Global.token = res.token;
      },
      (error) => {
        console.log(error);
      }
    );
  };
  ngOnInit(): void {
    this.autenticarse();
  }
}
