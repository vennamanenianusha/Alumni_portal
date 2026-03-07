import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string = '';
  initials: string = '';

  ngOnInit(): void {

    // Read username from local storage
    const storedName = localStorage.getItem('userName');

    if (storedName) {
      this.userName = storedName;
    } else {
      this.userName = 'User';
    }

    // Generate initials
    this.initials = this.getInitials(this.userName);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

}