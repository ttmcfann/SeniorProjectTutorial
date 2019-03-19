import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecapsService } from '../recaps.service';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent {
  enteredContent = '';
  enteredTitle = '';


  constructor(public recapsService: RecapsService) {}
  onAddRecap(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.recapsService.addRecap(form.value.title, form.value.content);
  }
}
