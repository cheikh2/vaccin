import { User } from '../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AuthenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onConnexion() {
  // console.log(this.loginForm.value)

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    let user = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    } as User;
    console.log(this.loginForm.value);
    this.AuthenticationService.login(user).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        console.error();
        this.loading = false;

      }
    )
  }



}
