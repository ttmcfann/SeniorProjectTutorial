import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recap } from '../recap.model';
import { RecapsService } from '../recaps.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-recap-list',
  templateUrl: './recap-list.component.html',
  styleUrls: ['./recap-list.component.css']
})
export class RecapListComponent implements OnInit, OnDestroy {
  // recaps = [
  //   {title: 'First Recap', content: 'This is the first post\'s content'},
  //   {title: 'Second Recap', content: 'This is the second post\'s content'},
  //   {title: 'Third Recap', content: 'This is the third post\'s content'},
  // ];
  recaps: Recap[] = [];
  isLoading = false;
  totalRecaps = 10;
  recapsPerPage = 2;
  recapSizeOptions = [1,2,5,10];
  private recapsSub: Subscription;

  constructor(public recapsService: RecapsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.recapsService.getRecaps();
    this.recapsSub = this.recapsService.getRecapUpdateListener()
      .subscribe((recaps: Recap[]) => {
        this.isLoading = false;
        this.recaps = recaps;
      });
  }

  onChangedRecap(recapData: PageEvent) {

  }

  onDelete(recapId: string) {
    this.recapsService.deleteRecap(recapId);
  }

  ngOnDestroy() {
    this.recapsSub.unsubscribe();
  }

}
