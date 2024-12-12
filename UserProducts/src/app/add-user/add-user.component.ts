import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder){
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
      const newUser = this.userForm.value;
      console.log('User added:', newUser);
    }
  }
}
