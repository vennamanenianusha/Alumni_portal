import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { MapLocationsComponent } from './map-locations/map-locations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AlumniComponent } from './alumni/alumni.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { JobsComponent } from './jobs/jobs.component';
import { EventsComponent } from './events/events.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'student', component: StudentComponent,canActivate: [AuthGuard] },
  { path: 'map-locations', component: MapLocationsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'alumni', component: AlumniComponent },
  { path: 'mentorship', component: MentorshipComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '**', redirectTo: 'student' },
  //{ path: 'student', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}