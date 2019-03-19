import { Component } from '@angular/core';

import { Recap } from './recap/recap.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedRecaps: Recap[] = [];

  onRecapAdded(recap) {
    this.storedRecaps.push(recap);
  }
}
