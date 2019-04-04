import { Recap } from './recap.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RecapsService {
  private recaps: Recap[] = [];
  private recapsUpdated = new Subject<{recaps: Recap[], recapCount: number}>();

  constructor(
  private http: HttpClient,
  private router: Router
  ) {}

  getRecaps(recapsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${recapsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, recaps: any, maxRecaps: number}>(
      'http://localhost:3000/api/recaps' + queryParams
      )
      .pipe(map((recapData) => {
        return {recaps: recapData.recaps.map(recap => {
          return {
            title: recap.title,
            content: recap.content,
            id: recap._id,
            imagePath: recap.imagePath,
            creator: recap.creator
          };
        }),
        maxRecaps: recapData.maxRecaps};
      }))
      .subscribe((transformedRecapData) => {
        this.recaps = transformedRecapData.recaps;
        this.recapsUpdated.next({
          recaps: [...this.recaps],
          recapCount: transformedRecapData.maxRecaps
        });
      });
  }

  getRecapUpdateListener() {
    return this.recapsUpdated.asObservable();
  }

  getRecap(id: string) {
    return this.http.get<{
      _id: string;
       title: string;
       content: string;
       imagePath: string;
       creator: string;
      }>('http://localhost:3000/api/recaps/' + id);
  }

  addRecap(title: string, content: string, image: File) {
    const recapData = new FormData();
    recapData.append('title', title);
    recapData.append('content', content);
    recapData.append('image', image, title);
    this.http
      .post<{ message: string, recap: Recap}>(
        'http://localhost:3000/api/recaps',
         recapData
        )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updateRecap(id: string, title: string, content: string, image: File | string) {
    let recapData: Recap | FormData;
    if (typeof(image) === 'object') {
      recapData = new FormData();
      recapData.append('id', id);
      recapData.append('title', title);
      recapData.append('content', content);
      recapData.append('image', image, title);
    } else {
      recapData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http.put('http://localhost:3000/api/recaps/' + id, recapData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteRecap(recapId: string) {
    return this.http.delete('http://localhost:3000/api/recaps/' + recapId);
  }
}
