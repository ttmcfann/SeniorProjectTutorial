import { Component, EventEmitter, Output } from '@angular/core';
import { Prayer } from '../prayer.model';

@Component({
  selector: 'app-prayer-create',
  templateUrl: './prayer-create.component.html',
  styleUrls:  ['./prayer-create.component.css']

})
export class PrayerCreateComponent {
  enteredName = '';
  enteredPrayer = '';
  @Output() prayerCreated = new EventEmitter<Prayer>();

  onAddPrayer() {
    const prayer: Prayer = {
      name: this.enteredName,
      content: this.enteredPrayer
    };
    this.prayerCreated.emit(prayer);
  }
}
