import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomResponse, Trainee } from '../models/interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,
    MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  hideVisibility = true ;

  toggleVisibility() {
    this.hideVisibility = !this.hideVisibility ;
  }

  registrationForm! : FormGroup; 

  constructor(private authService : AuthService, private router: Router,
    private fb : FormBuilder
  ) {

    this.registrationForm = this.fb.group({
      name: new FormControl<string>('', {
        validators: Validators.required,
        nonNullable: true
      }),
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/)],
        nonNullable: true
      })
    })
  }

  signUp() {
    
    if (this.registrationForm.invalid) {
      return; 
    }

    const trainee : Trainee = this.registrationForm.getRawValue(); 
    this.authService.register(trainee).subscribe(
      {
        next:
          (response: CustomResponse<{token: string}>) => {
            sessionStorage.setItem('traineeId', response.data.token)

            this.router.navigate(['main']); 
          },
        
        error:
          (err: any) => {
            console.error("Error: ", err);
            
          }
      }
    ); 
  }
}
