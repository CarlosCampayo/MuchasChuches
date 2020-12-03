import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from 'src/app/models/jobs/job';
import { User } from 'src/app/models/users/user';
import { Global } from 'src/app/services/global';
import { HackatonService } from 'src/app/services/hackaton.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  public jobs: Job[];
  public users: User[];
  public usersOfJobSelected: User[];
  public jobSelected: Job;

  constructor(
    private _servicioHackaton: HackatonService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.users = [];
    this.jobs = [];
    this.usersOfJobSelected = [];
    this.jobSelected = null;
  }
  getUsers = () => {
    this._servicioHackaton.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      //console.log(this.users);
    });
  };
  getJobs = () => {
    this._servicioHackaton.getJobs().subscribe((res) => {
      this.jobs = res;
      console.log('rdtr ' + this.jobs);
      for (var job in this.jobs) {
        console.log('this ' + job);
      }
      this.jobSelected = this.jobs[0];
      // console.log(this.jobs[0].name);
      this._activatedRoute.params.subscribe((params: Params) => {
        console.log(params.job);
        if (params.job != undefined) {
          this.jobSelected = this.getJobByName(params.job);
        }
        console.log(this.jobSelected);
      });
    });
  };
  getJobByName(name) {
    for (var job of this.jobs) {
      if (job.name == name) {
        return job;
      }
    }
    return null;
  }
  getUsersOfJobs = () => {
    for (var user of this.users) {
      if (user.job == this.jobSelected.name) {
        this.usersOfJobSelected.push(user);
      }
    }
  };
  getJobNameOfUser = (index) => {
    for (var job of this.jobs) {
      if (job.name == this.usersOfJobSelected[index].job) {
        for (var job_grade of job.job_grades) {
          if (job_grade.grade == this.usersOfJobSelected[index].job_grade) {
            return job_grade.label;
          }
        }
      }
    }
    return null;
  };
  selectJob = (index) => {
    this.jobSelected = this.jobs[index];
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
  ngOnInit(): void {
    this.autenticarse();
  }
}
