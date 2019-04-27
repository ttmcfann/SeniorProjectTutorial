import { Component, Input } from '@angular/core';
import { Prayer } from '../prayer.model';

@Component({
    selector: 'app-prayer-list',
    templateUrl: './prayer-list.component.html',
    styleUrls: ['./prayer-list.component.css']
})
export class PrayerListComponent {
  // prayers = [
  //   {name: 'Bobby', content: 'my fish died'},
  //   {name: 'Joe', content: 'my cat died'},
  //   {name: 'Bobby', content: 'my dog died'},
  // ];
  @Input() prayers = [];

}

