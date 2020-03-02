import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  mobile: Product;
  categories = ['electronics', 'mobiles', 'appliances', 'toys', 'fashion'];
  selectCatForm: FormGroup;
  editProductForm: FormGroup;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    
    this.selectCatForm = new FormGroup({
      'selectCat': new FormControl(),
    })
    
    this.editProductForm = new FormGroup({
      'id': new FormControl(),
      'mobileBrand': new FormControl(Validators.required),
      'mobileName': new FormControl(Validators.required),
      'mobileModel': new FormControl(Validators.required),
      'mobilePrice': new FormControl(Validators.required),
      'mobileImgPath': new FormControl(Validators.required),
      'description': new FormGroup({
        'mobileColor': new FormControl(Validators.required),
        'mobileRam': new FormControl(Validators.required),
        'mobileScreenSize': new FormControl( Validators.required),
        'mobileStorage': new FormControl( Validators.required),
        'mobileCamera': new FormControl( Validators.required),
        'mobileNetwork': new FormControl(Validators.required)
      })
    })
    
    this.route.data.subscribe((data: Data) => {
      this.mobile = data['mobile']
      this.editProductForm.setValue(this.mobile)
      this.selectCatForm.get('selectCat').setValue('mobiles');
    })
    
  }

  onEditProduct() {
    if (this.selectCatForm.get('selectCat').value === 'mobiles') {
      this.adminService.EditProduct(this.editProductForm.value).subscribe();
      this.router.navigate(['admin/products'], {queryParams: {edited: true}})
    }  
  }
}
