import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../mock-data.service';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private mockdata: MockDataService, public router: Router){
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      role: ['', Validators.required],
      nationalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.mockdata.getUsers().subscribe((users) => {
      const user = users.find((u) => u.id === this.userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    })
  }

  onSubmitEdit(): void{
    if (this.userForm.valid && this.userId){
      const username = this.userForm.getRawValue().username;
      const updatedUser = { id: this.userId, username, ...this.userForm.value };
      this.mockdata.updateUser(updatedUser).subscribe(() => {
        console.log("User Updaged");
        this.router.navigate(['/usersList']);
      })
    }
  }

}