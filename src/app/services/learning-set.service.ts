import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningSet } from '../models/learning-set';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSetService {
  constructor(private storeService: StoreService) { }

  getSets(): Observable<any[]> {
    return this.storeService.getSets();
  }

  getSetById(id: string){
    return this.storeService.getSetById(id);
  }

  addSet(set: LearningSet): Promise<any> {
    return this.storeService.addLearningSet(set);
  }

  updateSet(set: LearningSet): Promise<void> {
    return this.storeService.updateSet(set);
  }

  updateIsBookmarked(setId: string, isPinned: boolean): Promise<void> {
    const setRef = this.getSetById(setId);
    return setRef.update({ isPinned: isPinned });
  }

  deleteSet(set: LearningSet): Promise<void> {
    return this.storeService.deleteSet(set.id);
  }
}
