import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/jobs/job';
import { HackatonService } from 'src/app/services/hackaton.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  public jobs: Job[];
  constructor(private _servicioHackaton: HackatonService) {}

  getJobs = () => {
    this._servicioHackaton.getJobs().subscribe((res) => {
      this.jobs = res;
      console.log(this.jobs);
    });
  };
  ngOnInit(): void {
    this.getJobs();
  }
}
