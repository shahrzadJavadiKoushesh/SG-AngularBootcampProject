import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockDataService } from '../mock-data.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private mockdata: MockDataService, private router: Router, private authService: AuthService){
    this.userForm = this.fb.group({
      // later I have to add custom validators
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      role: ['', Validators.required],
      nationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmitaddUser() {
    if (this.userForm.valid) {
      const newUser = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
        firstName: this.userForm.value.name,
        lastName: this.userForm.value.familyName,
        nationalCode: this.userForm.value.nationalCode,
        mobile: this.userForm.value.phoneNumber,
      };
  
      this.authService.addUser(newUser).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.userForm.reset();
          this.router.navigate(['/usersList'], { state: { refresh: true } });
        },
        (error) => {
          console.error('Error adding user:', error);
          alert('Failed to add user. Please try again.');
        }
      );
    }
  }
  
}
