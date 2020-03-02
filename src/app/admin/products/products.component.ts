import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, FormGroup, FormControl } from '@angular/forms';

import { Product } from 'src/app/shared/product.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  mobiles: Product[] = [];
  mobileEdited = false;
  categories = ['electronics', 'mobiles', 'appliances', 'toys', 'fashion'];
  selectCatForm: FormGroup;
  @ViewChild('category', { static: false }) category: NgModel;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private http: HttpClient, private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.selectCatForm = new FormGroup({
      'selectCat': new FormControl(),
    })

    this.http.get<{ [key: string]: Product }>('https://app-souq.firebaseio.com/mobiles.json')
      .pipe(map(responseData => {
        const mobiles: Product[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            mobiles.push({ ...responseData[key], id: key })
          }
        }
        return mobiles;
      }))
      .subscribe(mobiles => this.mobiles = mobiles)

      this.mobileEdited = this.route.snapshot.queryParams['edited'];
  }

  onDeleteItem(i: number) {
    this.mobiles.splice(i, 1);
    this.adminService.deleteProduct(this.mobiles).subscribe();
  }

}
