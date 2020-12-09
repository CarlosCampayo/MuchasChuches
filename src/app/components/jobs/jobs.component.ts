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
  public stringjobs: String[];

  constructor(
    private _servicioHackaton: HackatonService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.users = [];
    this.jobs = [];
    this.stringjobs = [];
    this.usersOfJobSelected = [];
    this.stringjobs = [];
    this.jobSelected = null;
  }
  getUsers = () => {
    this._servicioHackaton.getUsers().subscribe((res) => {
      // console.log(res);
      this.users = res;
      //console.log(this.users);
    });
  };
  getJobs = () => {
    this._servicioHackaton.getJobs().subscribe((res) => {
      //console.log(res.bahamas);
      for (var name in res) {
        this.stringjobs.push(name);
        //console.log(res[name]);
        this.jobs.push(res[name]);
      }
      this.jobSelected = this.jobs[0];
      // console.log(this.jobs[0].name);
      this._activatedRoute.params.subscribe((params: Params) => {
        /*Pruebas*/
        // console.log(params.job);
        /*pruebas end*/
        if (params.job != undefined) {
          this.jobSelected = this.getJobByName(params.job);
        }
        // console.log(this.jobSelected);
        this.getUsersOfJobSelected();
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
  getUsersOfJobSelected = () => {
    this.usersOfJobSelected = [];
    for (var user of this.users) {
      if (user.job == this.jobSelected.name) {
        console.log(user);
        this.usersOfJobSelected.push(user);
      }
    }
  };
  getJobNameOfUser = (index) => {
    // if (job.name == this.userselected.job) {
    //   for (var job_grade in job.job_grades) {
    //     console.log(job_grade);
    //     if (job.job_grades[job_grade].grade == this.userselected.job_grade) {
    //       return job.job_grades[job_grade].salary;
    //     }
    //   }
    // }
    for (var job of this.jobs) {
      // console.log(this.usersOfJobSelected[index].job + '/' + job.name);
      if (job.name == this.usersOfJobSelected[index].job) {
        for (var job_grade in job.job_grades) {
          if (
            job.job_grades[job_grade].grade ==
            this.usersOfJobSelected[index].job_grade
          ) {
            console.log(job.job_grades[job_grade].label);

            return job.job_grades[job_grade].label;
          }
        }
      }
    }
    return null;
  };
  selectJob = (index) => {
    this.jobSelected = this.jobs[index];
  };
  // autenticarse = () => {
  //   this._servicioHackaton.authenticate().subscribe(
  //     (res) => {
  //       //console.log(res);
  //       Global.token = res.token;
  //       this.getUsers();
  //       this.getJobs();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };
  ngOnInit(): void {
    this.getUsers();
    this.getJobs();
    // this.autenticarse();
  }
}
