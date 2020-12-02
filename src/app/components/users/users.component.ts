import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from 'src/app/models/jobs/job';
import { User } from 'src/app/models/users/user';
import { Global } from 'src/app/services/global';
import { HackatonService } from 'src/app/services/hackaton.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public userselected: User;
  private jobs: Job[];
  constructor(
    private _servicioHackaton: HackatonService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.users = [];
    this.jobs = [];
    this.userselected = null;
  }
  getUsers = () => {
    this._servicioHackaton.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      this.userselected = this.users[0];
      console.log(this.users);
      this._activatedRoute.params.subscribe((params: Params) => {
        console.log(params.id);
        this.userselected = this.getUserById(params.id);
        console.log(this.userselected);
      });
    });
  };
  getJobs = () => {
    this._servicioHackaton.getJobs().subscribe((res) => {
      this.jobs = res;
      console.log(this.jobs);
    });
  };
  getSalary = () => {
    for (var job of this.jobs) {
      if (job.name == this.userselected.job) {
        for (var job_grade of job.job_grades) {
          if (job_grade.grade == this.userselected.job_grade) {
            return job_grade.salary;
          }
        }
      }
    }
    return null;
  };
  selectUser = (index) => {
    this.userselected = this.users[index];
  };
  autenticarse = () => {
    this._servicioHackaton.authenticate().subscribe(
      (res) => {
        //console.log(res);
        Global.token = res.token;
        this.getUsers();
        this.getJobs();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  getUserById = (id) => {
    console.log('id:' + id);
    for (var user of this.users) {
      if (user.identifier == id) {
        return user;
      }
    }
    return null;
  };
  ngOnInit(): void {
    this.autenticarse();
  }
}
