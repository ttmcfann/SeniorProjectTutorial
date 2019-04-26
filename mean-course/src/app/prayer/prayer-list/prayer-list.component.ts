import { Component } from '@angular/core';


@Component({
    selector: 'app-prayer-list',
    templateUrl: './prayer-list.component.html',
    styleUrls: ['./prayer-list.component.css']
})
export class PrayerListComponent {
  prayers = [
    {name: 'Bobby', content: 'my fish died'},
    {name: 'Joe', content: 'my cat died'},
    {name: 'Bobby', content: 'my dog died'},
  ];

}

