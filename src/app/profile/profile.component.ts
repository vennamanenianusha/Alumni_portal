import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  newPassword = '';
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const id = localStorage.getItem('studentId');
  
    this.http.get(`http://localhost:3000/api/student/profile/${id}`)
      .subscribe({
        next: (data: any) => {
          if (data.Date_of_Birth) {
            data.Date_of_Birth = data.Date_of_Birth.split('T')[0];
          }
          this.profile = data;
          this.loading = false;
        },
        error: () => alert('Failed to load profile')
      });
  }
  
  updateProfile() {
    const id = localStorage.getItem('studentId');
  
    this.http.put(
      `http://localhost:3000/api/student/profile/${id}`,
      this.profile
    ).subscribe({
      next: () => alert('Profile updated'),
      error: () => alert('Update failed')
    });
  }
  
}
