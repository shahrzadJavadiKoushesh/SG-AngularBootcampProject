import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MockDataService } from '../../mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private mockdata: MockDataService, protected router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Attempting to login with:', username, password);
      this.authService.login(username, password).subscribe({
        next: response => {
          console.log('Login successful', response);
          this.authService.setToken(response.sessionId); 
          this.authService.getCurrentUserFromApi().subscribe(user => {
            console.log('Current user:', user);
            this.authService.setCurrentUser(user); 
            this.router.navigate(['/usersList']);
          });
        },
        error: err => {
          console.error('Login failed', err);
        }
      });

    }
  }
}
