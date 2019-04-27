import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storedPrayers = [];

  onPrayerAdded(prayer) {
    this.storedPrayers.push(prayer);
  }
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
