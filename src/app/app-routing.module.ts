import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:job', component: JobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
