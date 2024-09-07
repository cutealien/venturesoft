import { Component, inject, SecurityContext, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  modalOpen = signal(false)
  errorMessage = signal('')

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    })
  })
  constructor(private sanitizer: DomSanitizer) {}

  openModal() {
    this.modalOpen.set(true)
  }
  closeModal() {
    this.modalOpen.set(false)
  }

  get emailIsInvalid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    )
  }

  get passwordIsInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    )
  }

  onSubmit() {
    let email = this.loginForm.value.email || ''
    let password = this.loginForm.value.password || ''
    const email_sanitized = this.sanitizer.sanitize(SecurityContext.HTML, email)
    const password_sanitized = this.sanitizer.sanitize(SecurityContext.HTML, password)
    this.loginForm.reset()
    this.closeModal()
  }

}
