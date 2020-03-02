import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MobileService } from './mobile.service';
import { Product } from './product.model';

@Injectable()

export class MobileResolverService implements Resolve<Product> {

    constructor(private mobileService: MobileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product  {
            return this.mobileService.fetchMobile(route.params['index']);
    }
}