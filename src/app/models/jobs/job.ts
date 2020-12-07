import { Job_Grades } from './job_grade';

export class Job {
  constructor(
    public label: string,
    public name: string,
    public job_grades: Job_Grades[]
  ) {}
}
