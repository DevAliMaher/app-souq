import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MobileService } from './mobile.service';
import { Product } from './product.model';
import { AdminService } from './admin.service';

@Injectable()

export class AdminProductResolverService implements Resolve<Product> {

    constructor(private adminService: AdminService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product  {
            return this.adminService.fetchAdminMobile(route.params['index']);
    }
}