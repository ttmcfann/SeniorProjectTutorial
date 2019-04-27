import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prayer-create',
  templateUrl: './prayer-create.component.html',
  styleUrls:  ['./prayer-create.component.css']

})
export class PrayerCreateComponent {
  enteredName = '';
  enteredPrayer = '';
  @Output() prayerCreated = new EventEmitter();

  onAddPrayer() {
    const prayer = {
      name: this.enteredName,
      content: this.enteredPrayer
    };
    this.prayerCreated.emit(prayer);
  }
}
