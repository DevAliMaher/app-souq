import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { MobileService } from '../shared/mobile.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  selectedMobiles: Product[] = [];
  selectedItems: number[] = [];
  selectedItem: HTMLInputElement;
  id: number;
  totalPrice: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private mobileService: MobileService ) {
    
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => this.selectedMobiles = data['items']);

    this.totalPrice = this.selectedMobiles.reduce((prev, cur) => {
      return prev + cur.mobilePrice;
    }, 0);

    // this.mobileService.cartItems.next(this.selectedMobiles.length)

  }

  onSelect(i: string) {
    this.id = +i;
    this.selectedItem = document.getElementById(this.id.toString()) as HTMLInputElement;
    if (this.selectedItem.checked === true) {
      this.selectedItems.push(this.id);
      // console.log(this.selectedItems);
    } else if (this.selectedItem.checked === false) {
      this.selectedItems.find((value: number, index) => {
        if (this.id === value) { 
          this.id = value; 
          this.selectedItems.splice(index,1);
          // console.log(this.selectedItems);
         }
      })
    }
  }

  onDelete() {
    this.selectedItems.forEach((index: number) => {
      this.selectedMobiles.splice(index, 1);
      // console.log(this.selectedMobiles);
    } )
    
   this.mobileService.editCartItems(this.selectedMobiles).subscribe();

   this.selectedItem.checked = false;
  }
  
}
