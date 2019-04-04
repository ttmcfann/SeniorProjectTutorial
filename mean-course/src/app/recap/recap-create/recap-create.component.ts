import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { RecapsService } from '../recaps.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recap } from '../recap.model';
import { mimeType} from './mim-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recap-create',
  templateUrl: './recap-create.component.html',
  styleUrls: ['./recap-create.component.css']
})
export class RecapCreateComponent implements OnInit, OnDestroy {
  enteredContent = '';
  enteredTitle = '';
  isLoading = false;
  form: FormGroup;
  imagePreview: string;


  private mode = 'create';
  private recapId: string;
  private authStatusSub: Subscription;
  recap: Recap;

  constructor(
    public recapsService: RecapsService,
    public route: ActivatedRoute,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
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
            content: recapData.content,
            imagePath: recapData.imagePath,
            creator: recapData.creator
          };
          this.form.setValue({
            'title': this.recap.title,
            'content': this.recap.content,
            'image': this.recap.imagePath
          });
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
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveRecap() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.recapsService.addRecap(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image);
    } else {
      this.recapsService.updateRecap(
        this.recapId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
        );
    }

    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
