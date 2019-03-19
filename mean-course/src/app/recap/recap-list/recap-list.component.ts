import { Component, Input } from '@angular/core';
import { Recap } from '../recap.model';


@Component({
  selector: 'app-recap-list',
  templateUrl: './recap-list.component.html',
  styleUrls: ['./recap-list.component.css']
})
export class RecapListComponent {
  // recaps = [
  //   {title: 'First Recap', content: 'This is the first post\'s content'},
  //   {title: 'Second Recap', content: 'This is the second post\'s content'},
  //   {title: 'Third Recap', content: 'This is the third post\'s content'},
  // ];
  @Input() recaps: Recap[] = [];

}
