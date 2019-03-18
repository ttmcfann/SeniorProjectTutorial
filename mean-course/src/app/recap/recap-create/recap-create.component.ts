import { Component } from '@angular/core';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html'
})
export class RecapCreateComponent {
  enteredValue = '';
  newRecap = 'NO CONTENT';


  onAddRecap() {
    this.newRecap = this.enteredValue;
  }
}
