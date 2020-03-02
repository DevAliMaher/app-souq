import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators'

import { Product } from './product.model';
import { Subject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class AdminService  {
    constructor(private http: HttpClient, private authService: AuthService) {}

    addNewMobile (mobile: Product) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return  this.http.post<Product>('https://app-souq.firebaseio.com/mobiles.json?auth=' + user.token, mobile)
          }))
    }
    
    EditProduct(mobile: Product) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            const link = 'https://app-souq.firebaseio.com/mobiles/' + mobile.id + '.json?auth=' + user.token;
            return this.http.patch<Product>(link, mobile);
          }))
    }

    deleteProduct(mobiles: Product[]) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.put('https://app-souq.firebaseio.com/mobiles.json?auth=' + user.token, mobiles)
          }))
    }

    fetchAdminMobile(id: string) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<{[key: string] : Product}>('https://app-souq.firebaseio.com/mobiles.json', {
                params: new HttpParams().set('auth', user.token)
            })
        }))
        
        .pipe(map( responseData => {
            const mobiles: Product[] = [];
            for(const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    mobiles.push({...responseData[key], id: key});
                }
            }
            return mobiles[id];
        })
        )
    }

}