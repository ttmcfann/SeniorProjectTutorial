import { Recap } from './recap.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecapsService {
  private recaps: Recap[] = [];
  private recapsUpdated = new Subject<Recap[]>();

  getRecaps() {
    return [...this.recaps];
  }

  getRecapUpdateListener() {
    return this.recapsUpdated.asObservable();
  }

  addRecap(title: string, content: string) {
    const recap: Recap = {title: title, content: content};
    this.recaps.push(recap);
    this.recapsUpdated.next([...this.recaps]);
  }
}
