import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recap } from '../recap.model';
import { RecapsService } from '../recaps.service';
import { Subscription } from 'rxjs';


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
  private recapsSub: Subscription;

  constructor(public recapsService: RecapsService) {}

  ngOnInit() {
    this.recapsService.getRecaps();
    this.recapsSub = this.recapsService.getRecapUpdateListener()
      .subscribe((recaps: Recap[]) => {
        this.recaps = recaps;
      });
  }

  ngOnDestroy() {
    this.recapsSub.unsubscribe();
  }

}
