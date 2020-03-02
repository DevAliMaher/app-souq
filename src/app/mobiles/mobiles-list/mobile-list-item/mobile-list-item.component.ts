import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-mobile-list-item',
  templateUrl: './mobile-list-item.component.html',
  styleUrls: ['./mobile-list-item.component.scss']
})
export class MobileListItemComponent implements OnInit {
  @Input() mobile: Product;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
