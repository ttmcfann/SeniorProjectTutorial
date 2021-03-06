import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Recap } from './recap.model';

const BACKEND_URL = environment.apiUrl + '/recaps/';

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
      BACKEND_URL + queryParams
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
      }>(BACKEND_URL + id);
  }

  addRecap(title: string, content: string, image: File) {
    const recapData = new FormData();
    recapData.append('title', title);
    recapData.append('content', content);
    recapData.append('image', image, title);
    this.http
      .post<{ message: string, recap: Recap}>(
        BACKEND_URL,
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
    this.http.put(BACKEND_URL + id, recapData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteRecap(recapId: string) {
    return this.http.delete(BACKEND_URL + recapId);
  }
}
