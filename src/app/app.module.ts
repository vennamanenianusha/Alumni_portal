import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    StudentComponent,
    MapLocationsComponent,
    DashboardComponent,
    ProfileComponent,
    AlumniComponent,
    MentorshipComponent,
    JobsComponent,
    EventsComponent,
    MessagesComponent,
    AdminComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,   
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
