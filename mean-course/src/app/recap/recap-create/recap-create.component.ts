import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecapsService } from '../recaps.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recap } from '../recap.model';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  isLoading = false;
  private mode = 'create';
  private recapId: string;
  recap: Recap;

  constructor(
    public recapsService: RecapsService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recapId')) {
        this.mode = 'edit';
        this.recapId = paramMap.get('recapId');
        this.isLoading = true;
        this.recapsService.getRecap(this.recapId).subscribe(recapData => {
          this.isLoading = false;
          this.recap = {id: recapData._id, title: recapData.title, content: recapData.content};
        });
      } else {
        this.mode = 'create';
        this.recapId = null;

      }
    });
  }
  onSaveRecap(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recapsService.addRecap(form.value.title, form.value.content);
    } else {
      this.recapsService.updateRecap(this.recapId, form.value.title, form.value.content);
    }

    form.resetForm();
  }
}
