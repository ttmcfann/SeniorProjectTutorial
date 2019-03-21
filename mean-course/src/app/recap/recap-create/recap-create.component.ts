import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
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
  form: FormGroup;


  private mode = 'create';
  private recapId: string;
  recap: Recap;

  constructor(
    public recapsService: RecapsService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: []})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recapId')) {
        this.mode = 'edit';
        this.recapId = paramMap.get('recapId');
        this.isLoading = true;
        this.recapsService.getRecap(this.recapId).subscribe(recapData => {
          this.isLoading = false;
          this.recap = {
            id: recapData._id,
            title: recapData.title,
            content: recapData.content
          };
          this.form.setValue({
            'title': this.recap.title,
            'content': this.recap.content});
        });
      } else {
        this.mode = 'create';
        this.recapId = null;

      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }

  onSaveRecap() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recapsService.addRecap(this.form.value.title, this.form.value.content);
    } else {
      this.recapsService.updateRecap(this.recapId, this.form.value.title, this.form.value.content);
    }

    this.form.reset();
  }
}
