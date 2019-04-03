import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recap } from '../recap.model';
import { RecapsService } from '../recaps.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';


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
  totalRecaps = 0;
  recapsPerPage = 2;
  currentPage = 1;
  recapSizeOptions = [1,2,5,10];
  userIsAuthenticated = false;
  private recapsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public recapsService: RecapsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.recapsService.getRecaps(this.recapsPerPage, this.currentPage);
    this.recapsSub = this.recapsService.getRecapUpdateListener()
      .subscribe((recapData: {recaps: Recap[], recapCount: number}) => {
        this.isLoading = false;
        this.totalRecaps = recapData.recapCount;
        this.recaps = recapData.recaps;
      });
     this.userIsAuthenticated = this.authService.getIsAuth();
     this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
     });
  }

  onChangedRecap(recapData: PageEvent) {
    this.isLoading = true;
    this.currentPage = recapData.pageIndex + 1;
    this.recapsPerPage = recapData.pageSize;
    this.recapsService.getRecaps(this.recapsPerPage, this.currentPage);
  }

  onDelete(recapId: string) {
    this.isLoading = true;
    this.recapsService.deleteRecap(recapId).subscribe(() => {
      this.recapsService.getRecaps(this.recapsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.recapsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
