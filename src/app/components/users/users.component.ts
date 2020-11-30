import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { HackatonService } from 'src/app/services/hackaton.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  constructor(private _servicioHackaton: HackatonService) {}

  getUsers = () => {
    this._servicioHackaton.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      console.log(this.users);
    });
  };
  ngOnInit(): void {
    this.getUsers();
  }
}
