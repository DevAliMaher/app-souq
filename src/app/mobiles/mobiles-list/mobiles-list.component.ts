import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { MobileService } from '../../shared/mobile.service';

@Component({
  selector: 'app-mobiles-list',
  templateUrl: './mobiles-list.component.html',
  styleUrls: ['./mobiles-list.component.scss']
})
export class MobilesListComponent implements OnInit {
  mobiles: Product[] = [];
  brands = ['apple' , 'samsung' , 'huawei'];
  selectedBrand: string[] = [];
  id: string;

  constructor(private mobileService: MobileService) { }

  ngOnInit() {
    this.mobileService.fetchMobiles().subscribe(mobiles => this.mobiles = mobiles)
    // this.mobiles = this.mobileService.getMobiles();
  }

  onSelect(brand: string) {
    let selected = document.getElementById(brand) as HTMLInputElement;
    if (selected.checked === true) {
      this.selectedBrand.push(brand);
      console.log(this.selectedBrand)
      this.mobiles = this.mobiles.filter(m => 
        m.mobileBrand === this.selectedBrand.find(x => brand === x)
      )
      console.log(this.mobiles)
    } else if (selected.checked === false) {
      this.mobileService.fetchMobiles().subscribe(mobiles => this.mobiles = mobiles)
      this.selectedBrand.find((b, index )=> {
        if (brand === b) {
          this.selectedBrand.splice(index,1)
          console.log(this.selectedBrand)
        }
      })
    }
  }


}
