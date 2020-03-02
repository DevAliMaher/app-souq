import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;	
    expiresIn: string;	
    localId: string;
    registered?: boolean;	
}

@Injectable()

export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(catchError(errorRes => {
                let errorMessage = 'an unknown error occurred';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                } else if (errorRes.error.error.message === "EMAIL_EXISTS") {
                    errorMessage = 'This Email Already Exists'
                  } 
                  return throwError(errorMessage);
            }),
                tap(responseData => {
                    const expData = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                    const user = new User(responseData.email, responseData.localId, responseData.idToken, expData);
                    this.user.next(user);
                })
            )
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(catchError(errorRes => {
                let errorMessage = 'an unknown error occurred';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                } else if (errorRes.error.error.message === "EMAIL_NOT_FOUND") {
                    errorMessage = 'this email not exists'
                  }  else if (errorRes.error.error.message === "INVALID_PASSWORD") {
                    errorMessage = 'invalid password'
                  } 
                  return throwError(errorMessage);
            }),
            tap(responseData => {
                const expData = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
                const user = new User(responseData.email, responseData.localId, responseData.idToken, expData);
                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
            })
            )
        }

        autoLogIn() {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpDate: string
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return;
            } 
                const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpDate));
            if (loadedUser.token) {
                this.user.next(loadedUser);
            }
        }

        logOut() {
            this.user.next(null);
            this.router.navigate(['user/sign-in']);
            localStorage.removeItem('userData')
        }
}