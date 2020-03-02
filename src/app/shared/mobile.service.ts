import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators'

import { Product } from './product.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class MobileService {
    cartItems = new BehaviorSubject<string[]>([]);
    constructor(private http: HttpClient, private authService: AuthService) {}

    fetchMobiles() {
        return this.http.get<{[key: string] : Product}>('https://app-souq.firebaseio.com/mobiles.json')
        .pipe(map( responseData => {
            const mobiles: Product[] = [];
            for(const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    mobiles.push({...responseData[key], id: key})
                }
            }
            return mobiles;
        }))
    }

    fetchMobile(id: string) {
        return this.http.get<{[key: string] : Product}>('https://app-souq.firebaseio.com/mobiles.json')
        .pipe(map( responseData => {
            const mobiles: Product[] = [];
            for(const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    mobiles.push({...responseData[key], id: key});
                }
            }
            return mobiles.find(
                mobile => {
                    if (id === mobile.id) {
                        return mobile ;
                    }
                }
            );
        })
        )
    }

    fetchCartItems() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.http.get<{[key: string]: Product}>('https://app-souq.firebaseio.com/toCart.json?auth=' + user.token)
        }), map(responseData => {
            const mobiles: Product[] = [];
            for(const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    mobiles.push({...responseData[key], id: key})
                }
            }
            return mobiles;
        }))
    }

    addToCart(mobile: Product) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return  this.http.post<Product[]>('https://app-souq.firebaseio.com/toCart.json?auth=' + user.token, mobile)
          }))
    }

    editCartItems(items: Product[]) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return  this.http.put('https://app-souq.firebaseio.com/toCart.json?auth=' + user.token, items)
          }))
    }

}
