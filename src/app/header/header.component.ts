import { Component, OnInit } from '@angular/core';
import { MobileService } from '../shared/mobile.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { faShoppingCart, faSortDown, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lang = 'English';
  accountDropDown = false;
  searchItem: any;
  cartItems: string[] = [];
  isUser = false;
  faShoppingCart = faShoppingCart;
  faSortDown = faSortDown; 
  faSearch = faSearch;
  constructor(private mobileService: MobileService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isUser = !user? false: true;
    })
  }
  onOpenAccount() {
    this.accountDropDown = true;
  }
  onCloseAccount() {
    this.accountDropDown = false;
  }

  onSearch() {
    this.mobileService.fetchMobiles()
  }

  onLogOut() {
      this.authService.logOut();

  }
}
