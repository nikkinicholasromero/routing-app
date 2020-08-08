import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const authenticated: boolean = this.authenticationService.isAuthenticated();
    console.log(authenticated);
    if (authenticated) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    const username: string = this.loginForm.controls['username'].value;
    const password: string = this.loginForm.controls['password'].value;
    if (this.authenticationService.authenticate(username, password)) {
      this.router.navigate(['/home']);
    }
  }

}
