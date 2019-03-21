import { Recap } from './recap.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RecapsService {
  private recaps: Recap[] = [];
  private recapsUpdated = new Subject<Recap[]>();

  constructor(
  private http: HttpClient,
  private router: Router
  ) {}

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

  getRecap(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/recaps/' + id);
  }

  addRecap(title: string, content: string) {
    const recap: Recap = {id: null, title: title, content: content};
    this.http
      .post<{ message: string, recapId: string}>('http://localhost:3000/api/recaps', recap)
      .subscribe((responseData) => {
        const id = responseData.recapId;
        recap.id = id;
        this.recaps.push(recap);
        this.recapsUpdated.next([...this.recaps]);
        this.router.navigate(['/']);
      });
  }

  updateRecap(id: string, title: string, content: string) {
    const recap: Recap = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/recaps/' + id, recap)
      .subscribe(response => {
        const updatedRecaps = [...this.recaps];
        const oldRecapIndex = updatedRecaps.findIndex(r => r.id === recap.id);
        updatedRecaps[oldRecapIndex] = recap;
        this.recaps = updatedRecaps;
        this.recapsUpdated.next([...this.recaps]);
        this.router.navigate(['/']);
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
