import { Recap } from './recap.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecapsService {
  private recaps: Recap[] = [];
  private recapsUpdated = new Subject<Recap[]>();

  constructor( private http: HttpClient) {}

  getRecaps() {
    this.http.get<{message: string, recaps: Recap[]}>('http://localhost:3000/api/recaps')
      .subscribe((recapData) => {
        this.recaps = recapData.recaps;
        this.recapsUpdated.next([...this.recaps]);
      });
  }

  getRecapUpdateListener() {
    return this.recapsUpdated.asObservable();
  }

  addRecap(title: string, content: string) {
    const recap: Recap = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/recaps', recap)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.recaps.push(recap);
        this.recapsUpdated.next([...this.recaps]);
      });
  }
}
