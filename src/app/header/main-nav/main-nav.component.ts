import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/shared/mobile.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  mobile = false;
  elec = false;
  home = false;
  toys = false;
  fashion = false;

  constructor(private router: Router, private mobileService: MobileService) { }

  ngOnInit() {

  }

  onOpenMobile() { this.mobile = true; }
  onCloseMobile() { this.mobile = false; }
  onOpenElec() { this.elec = true; }
  onCloseElec() { this.elec = false; }
  onOpenHome() { this.home = true; }
  onCloseHome() { this.home = false; }
  onOpenToys() { this.toys = true; }
  onCloseToys() { this.toys = false; }
  onOpenFashion() { this.fashion = true; }
  onCloseFashion() { this.fashion = false; }
  onNavMobiles() { this.router.navigate(['/mobiles']); }

  onNavAllMobiles(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/mobiles-list']);
  }
  onNavCheapMobiles() {

  }

}
