import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockDataService } from '../mock-data.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../validators';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      role: [, Validators.required],
      nationalCode: ['', [Validators.required, CustomValidators.nationalCode]],
      phoneNumber: ['', [Validators.required, CustomValidators.phoneNumber]],
      username: ['', Validators.required],
      password: ['', [Validators.required, CustomValidators.passwordStrength]],
    })
  }

  onSubmitaddUser() {
    if (this.userForm.valid) {
      const newUser = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: Number(this.userForm.value.role),
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
