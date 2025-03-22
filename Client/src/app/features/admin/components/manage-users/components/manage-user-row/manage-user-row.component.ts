import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../../shared/models/user.model';
import { ManageUsersStoreService } from '../../services/manage-users-store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-user-row',
  standalone: false,
  templateUrl: './manage-user-row.component.html',
  styleUrl: './manage-user-row.component.scss'
})
export class ManageUserRowComponent implements OnInit{
  @Input() user!: User;
  userForm!: FormGroup;
  isEditMode: boolean = false;

  get formControls(){
    return this.userForm.controls;
  }

  constructor(private readonly store: ManageUsersStoreService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.userForm = this.fb.group({
      fullName: [null, [Validators.required, Validators.minLength(3)]],
      idNumber: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      userName: [null, [Validators.required, Validators.minLength(4)]],
      birthDate: [null, [Validators.required]],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      profilePic: [null],
      role: [null, Validators.required]
    });

    this.userForm.disable();

    if (this.user) {
      this.setFormDefaultValues();
    }
  }

  setFormDefaultValues() {
    this.formControls['fullName'].setValue(this.user.FullName);
    this.formControls['idNumber'].setValue(this.user.IDNumber);
    this.formControls['userName'].setValue(this.user.Username);
    this.formControls['birthDate'].setValue(this.user.BirthDate);
    this.formControls['gender'].setValue(this.user.Gender);
    this.formControls['email'].setValue(this.user.Email);
    this.formControls['password'].setValue(this.user.PasswordHash);
    this.formControls['profilePic'].setValue(this.user.ProfilePicture);
    this.formControls['role'].setValue(this.user.Role);
  }

  saveUser(){
    if(this.userForm.invalid){{
      return;
    }}
    this.user.FullName = this.formControls['fullName'].value;
    this.user.IDNumber = this.formControls['idNumber'].value;
    this.user.Username = this.formControls['userName'].value;
    this.user.BirthDate = this.formControls['birthDate'].value;
    this.user.Gender = this.formControls['gender'].value;
    this.user.Email = this.formControls['email'].value;
    this.user.PasswordHash = this.formControls['password'].value;
    this.user.ProfilePicture = this.formControls['profilePic'].value;
    this.user.Role = this.formControls['role'].value;

    this.store.updateUser(this.user)
  }

  edit(){
    this.isEditMode = true;
    this.userForm.enable();
  }

  remove(){
    this.store.deleteUser(this.user.UserID!);
  }

  cancel(){
    this.isEditMode = false;
    this.userForm.disable();
    this.setFormDefaultValues();
  }

  setPicValue(value: string){
    this.formControls['profilePic'].setValue(value);
  }
}
