import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  passwordsMatchSubscription!: Subscription;
  showPassword: Boolean = false;
  showConfirmPassword: Boolean = false;
  errorMessage!: string;
  passwordsMatch!: boolean;
  confirmPasswordHasInput: boolean = false;
  sentEmailForVerification!: boolean;

  ngOnInit(): void {
    // Check passwords match
    this.passwordsMatchSubscription =
      this.form.controls.confirmPassword.valueChanges.subscribe(() => {
        this.passwordsMatch = this.passwordCheckPasswordsMatch();
      });
  }

  passwordCheckPasswordsMatch() {
    this.errorMessage = '';
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    this.confirmPasswordHasInput = !!confirmPassword;
    return confirmPassword?.trim() === password?.trim();
  }

  // Potentially add password strength indictator
  validatePassword(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Za-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    return strength;
  }

  // Destroy all subscriptions when changing routes
  ngOnDestroy(): void {
    this.passwordsMatchSubscription.unsubscribe();
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .register(rawForm.email, rawForm.password)
      .subscribe((result) => {
        if (result.error) {
          this.errorMessage = result.error.message;
        } else {
          this.sentEmailForVerification = true;
        }
      });
  }
}
