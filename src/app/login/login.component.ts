import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { CustomError, CustomResponse, Trainee } from '../models/interfaces';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommunicatorService } from '../communicator.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hideVisibility = true;
  isLoading = false;
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  toggleVisibility() {
    this.hideVisibility = !this.hideVisibility;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).pipe(
      tap(response => {
        if (!response?.data?.token) {
          throw new Error('Invalid token received');
        }
        sessionStorage.setItem('token', response.data.token);
      }),
      switchMap(() => {
        const email = this.dataService.getUser();
        if (!email) {
          throw new Error('User email not found');
        }
        return this.dataService.getUserByEmail(email);
      }),
      catchError(error => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid email or password. Please enter valid credentials';
        this.loginForm.reset();
        this.isLoading = false;
        return of(null);
      })
    ).subscribe({
      next: (response: CustomResponse<{ trainee: Trainee }> | null) => {
        if (response?.data?.trainee) {
          const { id } = response.data.trainee;
          if (id) {
            sessionStorage.setItem('id', String(id));
            this.router.navigate(['/main']);
          } else {
            this.errorMessage = 'User ID not found';
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Unexpected error:', error);
        this.errorMessage = 'An unexpected error occurred';
        this.isLoading = false;
      }
    });
  }
}