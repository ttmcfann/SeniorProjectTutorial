import { Component } from '@angular/core';

@Component({
  selector: 'app-prayer-create',
  templateUrl: './prayer-create.component.html'

})
export class PrayerCreateComponent {
  newPrayer = 'No Prayer';

  onAddPrayer() {
    this.newPrayer = 'The user\'s prayer';
  }
}