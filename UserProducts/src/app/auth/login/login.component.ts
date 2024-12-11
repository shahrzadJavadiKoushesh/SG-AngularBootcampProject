import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      console.log(username);
      console.log(password);
      const loginReuslt = this.authService.login(username, password)
      
      if (loginReuslt.success){
        // later I should navigate to the appropriate page
        console.log("Login was successful");
      } else{
        console.log("Login failed " + loginReuslt.message)
      }
    }

  }

}
