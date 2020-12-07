import { Identify } from './identify';
import { Vehicle } from './vehicle';

export class User {
  constructor(
    public identifier: string,
    public identity: Identify,
    public job: string,
    public job_grade: number,
    public bank_money: number,
    public phone_number: string,
    public licenses: [],
    public phone_calls: [],
    public validated: boolean,
    public house_id: number,
    public vehicles: Object[]
  ) {}
}
