import { Component, OnInit } from '@angular/core';
import {
  faTwitter,
  faFacebookSquare,
  faYoutube,
  faInstagram,
  faPinterest,
  faGooglePlay,
  faApple
} from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  isUser = false;
  faFacebookSquare = faFacebookSquare;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faPinterest = faPinterest;
  faGooglePlay = faGooglePlay;
  faApple = faApple;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isUser = !user? false: true;
    })
  }
}
