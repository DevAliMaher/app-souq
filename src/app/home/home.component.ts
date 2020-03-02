import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../shared/product.model';
import { AddsService } from '../shared/adds.service';
import { interval, Subscription } from 'rxjs';
import { Data, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobiles: Product[];
  addsImg: string[];
  img: string;
  i = 0;
  private addsObsSubscription: Subscription;
  constructor(private addsService: AddsService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.addsImg = this.addsService.getAddsImg();
    this.img = this.addsImg[this.i];
    this.addsObsSubscription = interval(3000).subscribe(() => {
        this.img = this.addsImg[this.i];
        this.i++;
        this.i %= this.addsImg.length;
        // console.log(this.i);
      }
    )
    //  setInterval(() => {
    //   this.img = this.addsImg[this.i];
    //   this.i++;
    //   this.i %= this.addsImg.length;
    //  }, 5000);
   

  }
  onNextImg() {
    this.img = this.addsImg[this.i++];
    this.i %= this.addsImg.length;
  }
  onBackImg() {
    this.img = this.addsImg[this.i--];
    if (this.i < 0) {
      this.i = this.addsImg.length;
      this.i--;
    } else {
      this.i %= this.addsImg.length;
    }
  }
  onSelectAdd(id: number) {
    this.img = this.addsImg[id];
  }

  ngOnDestroy() {
    this.addsObsSubscription.unsubscribe();
  }
}
