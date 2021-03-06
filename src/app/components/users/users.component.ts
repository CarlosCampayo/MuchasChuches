import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  private stringjobs: String[];
  private stringVehicles: String[];
  @ViewChild('cajabuscador') cajabuscador: ElementRef;
  constructor(
    private _servicioHackaton: HackatonService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.cajabuscador = ElementRef.prototype;
    this.users = [];
    this.jobs = [];
    this.stringjobs = [];
    this.stringVehicles = [];
    this.userselected = null;
  }
  search = () => {
    var cadena = this.cajabuscador.nativeElement.value;
    // console.log('cadena' + cadena + '-');
    var userssearch = this.users;
    this._servicioHackaton.getUsers().subscribe((res) => {
      // console.log(res);
      this.users = res;
      if (cadena != '') {
        this.users = [];
        for (var user of userssearch) {
          if (
            user.identity.name.toLowerCase().includes(cadena.toLowerCase()) ||
            user.identity.firstname
              .toLowerCase()
              .includes(cadena.toLowerCase()) ||
            user.identity.secondname
              .toLowerCase()
              .includes(cadena.toLowerCase()) ||
            (user.identity.name + ' ' + user.identity.firstname)
              .toLowerCase()
              .includes(cadena.toLowerCase()) ||
            (
              user.identity.name +
              ' ' +
              user.identity.firstname +
              ' ' +
              user.identity.secondname
            )
              .toLowerCase()
              .includes(cadena.toLowerCase())
          ) {
            this.users.push(user);
          }
        }
        // console.log(this.users);
        this.userselected = this.users[0];
      } else {
        // console.log('entra todos');
        this.users = res;
        // console.log(this.users);
        this.userselected = this.users[0];
      }
    });
  };
  getUsers = () => {
    this._servicioHackaton.getUsers().subscribe((res) => {
      // console.log(res);
      this.users = res;
      this.userselected = this.users[0];
      // console.log(this.userselected);
      this._activatedRoute.params.subscribe((params: Params) => {
        // console.log(params.id);
        if (params.id != undefined) {
          this.userselected = this.getUserById(params.id);
          // console.log(this.userselected.vehicles[0]);
          this.stringVehicles = [];
          for (var vehicle in this.userselected.vehicles) {
            // console.log(vehicle);
            this.stringVehicles.push(vehicle);
          }
        }
        // console.log(this.userselected);
      });
    });
  };
  getJobs = () => {
    this._servicioHackaton.getJobs().subscribe((res) => {
      for (var name in res) {
        this.stringjobs.push(name);
        //console.log(res[name]);
        this.jobs.push(res[name]);
      }
      // console.log(this.jobs);
    });
  };
  getSalary = () => {
    for (var job of this.jobs) {
      // console.log(job.name + '/' + this.userselected.job);
      if (job.name == this.userselected.job) {
        for (var job_grade in job.job_grades) {
          // console.log(job_grade);
          if (job.job_grades[job_grade].grade == this.userselected.job_grade) {
            return job.job_grades[job_grade].salary;
          }
        }
      }
    }
    return null;
  };
  selectUser = (index) => {
    this.userselected = this.users[index];
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
  getUserById = (id) => {
    // console.log('id:' + id);
    for (var user of this.users) {
      if (user.identifier == id) {
        return user;
      }
    }
    return null;
  };
  ngOnInit(): void {
    // this.autenticarse();
    this.getUsers();
    this.getJobs();
  }
}
