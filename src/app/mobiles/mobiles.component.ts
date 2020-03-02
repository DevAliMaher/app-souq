import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MobileService } from '../shared/mobile.service';
import { Product } from '../shared/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.scss']
})
export class MobilesComponent implements OnInit {
  mobiles: Product[] ;
  cheapMobiles: Product[];
  mediumMobiles: Product[];
  highMobiles: Product[];
  appleMobiles: Product[];
  samsungMobiles: Product[];
  huaweiMobiles: Product[];

  constructor(private mobileService: MobileService, private http: HttpClient) { }

  ngOnInit() {
    this.mobileService.fetchMobiles().subscribe(mobiles => this.mobiles = mobiles);

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.cheapMobiles= mobiles.filter((mobile) => mobile.mobilePrice >= 1000 && mobile.mobilePrice < 10000));

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.mediumMobiles= mobiles.filter((mobile) => mobile.mobilePrice >= 10000 && mobile.mobilePrice < 20000));

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.highMobiles= mobiles.filter((mobile) => mobile.mobilePrice >= 20000 ));

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.appleMobiles= mobiles.filter((mobile) => mobile.mobileBrand === 'apple'));

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.samsungMobiles= mobiles.filter((mobile) => mobile.mobileBrand === 'samsung'));

    this.mobileService.fetchMobiles().subscribe(mobiles =>  
      this.huaweiMobiles= mobiles.filter((mobile) => mobile.mobileBrand === 'huawei'));

  }

}
