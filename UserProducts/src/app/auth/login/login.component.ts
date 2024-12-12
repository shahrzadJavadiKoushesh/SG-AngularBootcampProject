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

      const user = this.mockdata.users.find(
        (u) => u.username === username && u.password === password
      )
      if (user) {
        this.authService.setCurrentUser(user);
        if (user.role === 'admin') {
          this.router.navigate(['/addUser']);
        }
        console.log("Login was successful");
      } else {
        console.log("User doens't exist.")
      }
    }

  }

}
