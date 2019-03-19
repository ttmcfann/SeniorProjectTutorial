import { Component, EventEmitter, Output } from '@angular/core';
import { Recap } from '../recap.model';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() recapCreated = new EventEmitter<Recap>();


  onAddRecap() {
    const recap: Recap = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.recapCreated.emit(recap);
  }
}
