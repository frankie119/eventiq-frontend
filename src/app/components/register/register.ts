import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: 'register.html',
  styleUrl: 'register.css'
})
export class RegisterComponent {
  categories = ['chill', 'music', 'sport', 'arts', 'education', 'food'];
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      full_name: ['', Validators.required],
      location: ['Belfast'],
      interests: [[]] // This will hold the array of selected categories
    });
  }

  onInterestChange(category: string, event: any) {
    const interests = this.registerForm.get('interests')?.value as string[];
    
    if (event.target.checked) {
      interests.push(category);
    } else {
      const index = interests.indexOf(category);
      if (index > -1) interests.splice(index, 1);
    }

    this.registerForm.patchValue({ interests: interests });
  }

  onSubmit() {
    this.errorMessage = ''; 
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.successMessage = 'Account created successfully! Redirecting...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: any) => {
          this.errorMessage = err.error.error || 'Registration failed';
        }
      });
    }
  }
}