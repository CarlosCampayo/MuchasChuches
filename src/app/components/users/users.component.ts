import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/jobs/job';
import { User } from 'src/app/models/users/user';
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
  constructor(private _servicioHackaton: HackatonService) {
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
  ngOnInit(): void {
    this.getUsers();
    this.getJobs();
  }
}
