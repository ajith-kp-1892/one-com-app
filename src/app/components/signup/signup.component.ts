import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage : string = ''
  roles = [
    'ADMIN',
    'SELLER',
    'SUPPORTER',
    'CUSTOMER'
  ]

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      userName: [''],
      role: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  registerUser() {
    this.errorMessage = ''
    const signUp = this.authService.signUp(this.signupForm.value)
    signUp.subscribe((res) => {
      if(res.error) {
        this.errorMessage = res.error
      }
      if (res.message) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    })
  }
}
