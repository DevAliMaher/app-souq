import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-item',
  templateUrl: './mobile-item.component.html',
  styleUrls: ['./mobile-item.component.scss']
})
export class MobileItemComponent implements OnInit {
  @Input() mobile: Product;
  @Input() index: string;
  constructor() { }

  ngOnInit() {
  }

  // onNavDescription() {
  //   this.router.navigate([this.index], {relativeTo: this.route});
  // }

}
