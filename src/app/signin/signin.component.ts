import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var google: any;

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
export class SigninComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  googleClientId = ''; // Will be set from environment or config

  constructor(private router: Router, private http: HttpClient) {
    // TODO: Load from environment file or config service
    // For development, set it here temporarily
    this.googleClientId = 'YOUR_GOOGLE_CLIENT_ID_HERE'; 
  }

  ngOnInit(): void {
    // Initialize Google Sign-In SDK
    this.initializeGoogleSignIn();
  }

  /**
   * Initialize Google Sign-In SDK
   */
  private initializeGoogleSignIn(): void {
    // Load Google SDK script dynamically
    if (!document.getElementById('google-signin-script')) {
      const script = document.createElement('script');
      script.id = 'google-signin-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('Form invalid');
      form.control.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

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
          this.isLoading = false;

          if (res.token && res.user) {
            // store token and user info
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.user.role);
            localStorage.setItem('userId', res.user.id);
            console.log('Token and userId stored');

            // redirect based on role
            if (res.user.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/student']);
            }
          } else {
            this.errorMessage = 'Login failed: no token returned';
            console.error(this.errorMessage);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      });
  }

  /**
   * Initiates Google Sign-In authentication flow
   */
  loginWithGoogle(): void {
    this.isLoading = true;
    
    // Initialize Google One Tap or Google Sign-In
    if (google && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleSignIn(response)
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { 
          theme: 'outline', 
          size: 'large',
          text: 'signin'
        }
      );

      // Alternative: Open Google Sign-In display
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Sign-In prompt was not displayed, manually trigger sign-in
          this.triggerGoogleSignIn();
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Google Sign-In is not available. Please try again.';
    }
  }

  /**
   * Manually trigger Google Sign-In popup
   */
  private triggerGoogleSignIn(): void {
    if (google && google.accounts) {
      google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { 
          theme: 'outline', 
          size: 'large'
        }
      );
    }
  }

  /**
   * Handle Google Sign-In callback
   */
  private handleGoogleSignIn(response: any): void {
    const idToken = response.credential;

    if (!idToken) {
      this.isLoading = false;
      this.errorMessage = 'Google Sign-In failed. Please try again.';
      return;
    }

    // Send token to backend for verification and user creation/login
    this.http.post<LoginResponse>('http://localhost:3000/api/auth/google-signin', {
      token: idToken
    }).subscribe({
      next: (res) => {
        console.log('Google Sign-In successful:', res);
        this.isLoading = false;

        if (res.token && res.user) {
          // Store token and user info
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('authMethod', 'google');
          console.log('Google token and userId stored');

          // Redirect based on role
          if (res.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/student']);
          }
        }
      },
      error: (err) => {
        console.error('Google Sign-In backend error:', err);
        this.isLoading = false;
        this.errorMessage = 'Google Sign-In failed. Please try again or use email/password.';
      }
    });
  }

  /**
   * Initiates SAML authentication flow
   * Redirects to backend SAML endpoint
   */
  loginWithSAML(): void {
    this.isLoading = true;
    
    // Redirect to SAML authentication endpoint
    const samlUrl = 'http://localhost:3000/api/auth/saml/login';
    
    // Store the current route to redirect back after SAML callback
    sessionStorage.setItem('redirectAfterSAML', this.router.url);
    
    // Redirect to SAML login
    window.location.href = samlUrl;
  }

  /**
   * Handles SAML callback after authentication
   * Called automatically after SAML provider redirects back
   */
  handleSAMLCallback(): void {
    // Check if SAML token is in URL or localStorage from backend redirect
    const urlParams = new URLSearchParams(window.location.search);
    const samlToken = urlParams.get('token');
    const role = urlParams.get('role') || 'student';

    if (samlToken) {
      // Store SAML token
      localStorage.setItem('token', samlToken);
      localStorage.setItem('role', role);
      localStorage.setItem('authMethod', 'saml');

      // Get redirect URL or default
      const redirectUrl = sessionStorage.getItem('redirectAfterSAML') || 
                         (role === 'admin' ? '/admin' : '/student');
      
      sessionStorage.removeItem('redirectAfterSAML');

      // Redirect to application
      this.router.navigate([redirectUrl]);
    }
  }
}
