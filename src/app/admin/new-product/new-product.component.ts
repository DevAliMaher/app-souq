import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgModel, NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Product } from 'src/app/shared/product.model';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { take, exhaust, exhaustMap } from 'rxjs/operators';
import { MobileService } from 'src/app/shared/mobile.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  mobileAdded = false;
  categories = ['electronics', 'mobiles', 'appliances', 'toys', 'fashion'];
  selectCatForm: FormGroup;
  addNewProductForm: FormGroup;

  constructor( private authService: AuthService , private adminService: AdminService) { }

  ngOnInit() {
    this.selectCatForm = new FormGroup({
      'selectCat': new FormControl(),
    })
    this.addNewProductForm = new FormGroup({
      'mobileBrand': new FormControl(null, Validators.required),
      'mobileName': new FormControl(null, Validators.required),
      'mobileModel': new FormControl(null, Validators.required),
      'mobilePrice': new FormControl(null, Validators.required),
      'mobileImgPath': new FormControl(null, Validators.required),
      'description': new FormGroup({
        'mobileColor': new FormControl(null, Validators.required),
        'mobileRam': new FormControl(null, Validators.required),
        'mobileScreenSize': new FormControl(null, Validators.required),
        'mobileStorage': new FormControl(null, Validators.required),
        'mobileCamera': new FormControl(null, Validators.required),
        'mobileNetwork': new FormControl(null, Validators.required)
      })
    })
    
  }

  onAddProduct() {
    console.log(this.addNewProductForm.value);
    if (this.selectCatForm.get('selectCat').value === 'mobiles') {
      this.adminService.addNewMobile(this.addNewProductForm.value).subscribe();
      this.mobileAdded = true;
    }
  }

}