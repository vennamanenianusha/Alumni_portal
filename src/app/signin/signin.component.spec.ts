import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  active = false;

  constructor(private router: Router) {}

  onContainerClick(event: MouseEvent) {
    // don't toggle when clicking inside center (inputs/buttons)
    const target = event.target as HTMLElement;
    if (target.closest('.center')) return;
    this.active = !this.active;

    if (this.active) {
      // focus email after DOM updates
      setTimeout(() => {
        const email = document.querySelector('input[type="email"]') as HTMLInputElement;
        email?.focus();
      }, 0);
    }
  }

  onSubmit(form?: NgForm) {
    // TODO: real auth
    // this.router.navigate(['/home']);
    console.log('submit', form?.value);
  }
}