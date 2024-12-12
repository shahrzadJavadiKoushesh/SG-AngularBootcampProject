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

  constructor(private fb: FormBuilder, private authService: AuthService, private mockdata: MockDataService, protected router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username);
      console.log(password);

      this.authService.login(username, password).subscribe((loginResult) => {
        if (loginResult.success) {
          if (loginResult.user.role === 'admin') {
            this.router.navigate(['/usersList']); 
          } else {
            // For now redirect both to the users list page
            this.router.navigate(['/usersList']); 
          }
        } else {
          console.log('Login failed: ' + loginResult.message);
        }
      });
    }

  }

}
