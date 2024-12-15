import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../mock-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public router: Router, private authService: AuthService){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      role: [ Validators.required],
      nationalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.authService.getUserById(this.userId).subscribe(
        (user: any) => {
          if (user) {
            this.userForm.patchValue({
              name: user.firstName,
              familyName: user.lastName,
              role: user.role,
              nationalCode: user.nationalCode,
              phoneNumber: user.mobile,
              username: user.username,
              password: '', // Leave password blank
            });
          } else {
            alert('User not found');
            this.router.navigate(['/usersList']);
          }
        },
        (error: any) => {
          console.error('Error fetching user:', error);
          alert('Failed to load user details. Please try again.');
          this.router.navigate(['/usersList']);
        }
      );
    } else {
      alert('Invalid user ID');
      this.router.navigate(['/usersList']);
    }
  }

  onSubmitEdit(): void {

    if (this.userForm.valid && this.userId) {
      const updatedUser = {
        id: this.userId,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: Number(this.userForm.value.role), 
        firstName: this.userForm.value.name,
        lastName: this.userForm.value.familyName,
        nationalCode: this.userForm.value.nationalCode,
        mobile: this.userForm.value.phoneNumber,
      };
  
      this.authService.updateUser(updatedUser).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/usersList']);
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user. Please try again.');
        }
      );
    }
  }  
}
