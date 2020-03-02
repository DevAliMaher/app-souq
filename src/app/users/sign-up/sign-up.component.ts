import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }
  onShowPassword(pass: HTMLInputElement) {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password'
    }
  }

   onSubmit(signUp: NgForm) {
     if (!signUp.valid) {
       return;
     }

    const email = signUp.value.email;
    const password = signUp.value.password;

    this.isLoading = true;

    this.authService.signUp(email, password).subscribe(
        responseData => {  
          this.isLoading = false;
        },
        errorMessage => { 
          this.error = errorMessage;
          this.isLoading = false;
        },
        () => {
          this.router.navigate(['/user/sign-in'], { queryParams: { 'successes': true } });
        }
        );

    signUp.reset();
  }

}
