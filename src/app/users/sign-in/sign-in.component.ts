import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  successesSignUp =  false;
  successesSignIn = false;
  isLoading = false;
  error: string = null;
  isUser = false;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.successesSignUp = this.route.snapshot.queryParams['successes'];

    this.authService.user.subscribe(user => {
      this.isUser = !user? false: true;
    })
  }

  onShowPassword(pass: HTMLInputElement) {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password'
    }
  }

  onSubmit(signIn: NgForm) {
    if (!signIn.valid) {
      return;
    }

   const email = signIn.value.email;
   const password = signIn.value.password;

   this.isLoading = true;
   this.successesSignUp = false;

   this.authService.signIn(email, password).subscribe(
       responseData => { 
         this.isLoading = false;
       },
       errorMessage => { 
         this.error = errorMessage;
         this.isLoading = false;
       }, () => {
        this.successesSignIn = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000)
       }
       );
       
 }

}
