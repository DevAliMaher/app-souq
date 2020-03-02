import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from './shared/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('isOpen', [
      state('closed', style({'max-width': 0})),
      state('opened', style({width: '100%'})),
      transition('closed <=> opened', animate(300))
    ])
  ]
})

export class AppComponent implements OnInit {
  state = 'closed';
  isOpened = false;
  openSideNavTab = false;
  faBars = faBars;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogIn();
  }
  
  onAnimateSideNav() {
    this.isOpened = true;
    // this.state === 'closed' ? this.state = 'opened' : this.state = 'closed';
  }

  onCloseSideNav() {
    this.isOpened = false;
    this.openSideNavTab = false;
  }

  onOpenSideNavTab() {
    this.openSideNavTab = true;
  }
}
