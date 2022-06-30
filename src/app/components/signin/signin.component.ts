import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage  = ''

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  loginUser() {
    this.errorMessage = ''
    this.authService.signIn(this.signinForm.value)
    .subscribe((res: any) => {

      if( res.accessToken) {
        localStorage.setItem('access_token', res.accessToken);
        this.router.navigate(['dashboard']);
        return
      }
      
      this.errorMessage= res
    })
  }
}
