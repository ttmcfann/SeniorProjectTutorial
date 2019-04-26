import { Component } from '@angular/core';

@Component({
  selector: 'app-prayer-create',
  templateUrl: './prayer-create.component.html',
  styleUrls:  ['./prayer-create.component.css']

})
export class PrayerCreateComponent {
  enteredPrayer = '';
  newPrayer = 'No Prayer';

  onAddPrayer() {

    this.newPrayer = this.enteredPrayer;
  }
}
