import { Component } from '@angular/core';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent {
  enteredValue = '';
  newRecap = 'NO CONTENT';


  onAddRecap() {
    this.newRecap = this.enteredValue;
  }
}
