import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Data } from '@angular/router';

import { MobileService } from '../../shared/mobile.service';
import { Product } from 'src/app/shared/product.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.scss']
})
export class MobileDetailsComponent implements OnInit {
  mobile: Product;
  isUser = false;
  askLogIn = false;

  constructor( private route: ActivatedRoute, private mobileService: MobileService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => this.mobile = data['mobile'])
    this.authService.user.subscribe(user => {
      this.isUser = !user? false: true;
    })
  }

  onAddToCart() {this.mobileService.addToCart(this.mobile)
    this.mobileService.addToCart(this.mobile).subscribe();
    if (!this.isUser) {
      this.askLogIn = true;
    } else {
      this.askLogIn = false;
    }
  }

}
