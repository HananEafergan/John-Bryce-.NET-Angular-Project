import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  genders = ['Male', 'Female'];

  constructor(private fb: FormBuilder, private readonly authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      profilePicture: [null]
    }, <AbstractControlOptions>{
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      let user: User = this.registerForm.getRawValue();
      user.PasswordHash = this.registerForm.controls['password'].value;
      user.Gender = this.registerForm.controls['gender'].value[0];
      this.authService.register(user)
    }
  }

  handleStringOutput(outputString: string) {
    this.registerForm.get("profilePicture")?.setValue(outputString, { emitEvent: false });
  }

  async handleFile(files: FileList): Promise<void> {
    const fileUploaded = files.item(0);
    console.log(fileUploaded);
    let fileBase64Str: any;
    if (fileUploaded) {
      fileBase64Str = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(fileUploaded);
      })
    }
  }

  get passwordMismatch(): boolean {
    return this.registerForm.hasError('mismatch') && this.registerForm.get('confirmPassword')?.touched == true;
  }
}