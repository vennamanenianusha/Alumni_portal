import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  active = false;

  constructor(private router: Router, private http: HttpClient) {}

  onContainerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('.center')) return;
    this.active = !this.active;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('Form invalid');
      form.control.markAllAsTouched();
      return;
    }

    const { email, password, role } = form.value;
    console.log('Submitting login:', email, role);

    // choose API based on role
    const apiUrl =
      role === 'admin'
        ? 'http://localhost:3000/api/auth/admin-login'
        : 'http://localhost:3000/api/auth/login';

    this.http.post<LoginResponse>(apiUrl, { email, password })
      .subscribe({
        next: (res) => {
          console.log('Response from backend:', res);

          if (res.token && res.user) {
            // store token and user info
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', role);
            localStorage.setItem('studentId', res.user.id);
            console.log('Token and userId stored');

            // redirect based on role
            if (role === 'student') {
              this.router.navigate(['/student']);
            } else {
              this.router.navigate(['/admin']);
            }
          } else {
            alert('Login failed: no token returned');
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid email or password');
        }
      });
  }
}
