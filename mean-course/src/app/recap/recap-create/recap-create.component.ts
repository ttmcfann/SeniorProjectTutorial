import { Component, EventEmitter, Output } from '@angular/core';
import { Recap } from '../recap.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() recapCreated = new EventEmitter<Recap>();


  onAddRecap(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const recap: Recap = {
      title: form.value.title,
      content: form.value.content
    };
    this.recapCreated.emit(recap);
  }
}
