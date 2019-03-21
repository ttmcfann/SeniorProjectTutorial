import { Recap } from './recap.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecapsService {
  private recaps: Recap[] = [];
  private recapsUpdated = new Subject<Recap[]>();

  constructor( private http: HttpClient) {}

  getRecaps() {
    this.http.get<{message: string, recaps: any}>(
      'http://localhost:3000/api/recaps'
      )
      .pipe(map((recapData) => {
        return recapData.recaps.map(recap => {
          return {
            title: recap.title,
            content: recap.content,
            id: recap._id
          };
        });
      }))
      .subscribe((transformedRecaps) => {
        this.recaps = transformedRecaps;
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

  deleteRecap(recapId: string) {
    this.http.delete('http://localhost:3000/api/recaps/' + recapId)
      .subscribe(() => {
        const updatedRecap = this.recaps.filter(recap => recap.id !== recapId);
        this.recaps = updatedRecap;
        this.recapsUpdated.next([...this.recaps]);
      });
  }
}
