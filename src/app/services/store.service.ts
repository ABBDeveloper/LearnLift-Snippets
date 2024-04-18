import { Injectable } from '@angular/core';
import { LearningSet } from 'src/app/models/learning-set';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Card } from '../models/card';
import { StatisticsUpdateCode } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private firestore: AngularFirestore) { }

  getSets(): Observable<any[]> {
    const learningSetsCollection = this.firestore.collection('learningSets');
    return learningSetsCollection.valueChanges();
  }

  getCards(learningSetId: string): Observable<any[]> {
    const learningSetRef = this.firestore.collection('learningSets').doc(learningSetId);
    const cardsCollection = learningSetRef.collection('cards');
    return cardsCollection.valueChanges();
  }

  getSetById(id: string){
    return this.firestore.collection('learningSets').doc(id);
  }

  getCardById(id: string){
    return this.firestore.collection('learningSets').doc(id);
  }

  getStatisticById(id: string) {
    return this.firestore.collection('learningSetsStatistics').doc(id);
  }

  addLearningSet(learningSet: LearningSet): Promise<any> {
   // Privater Code
  }

  addCard(card: Card, learningSetId: string): Promise<any> {
   // Privater Code
  }

  addCards(cards: Card[], learningSetId: string): Promise<any> { 
    // Privater Code
  }
  

  updateStatistics(setId: string, updateCode: StatisticsUpdateCode) {
    // Privater Code
  }

  updateStatisticsForSeveralCards(setId: string, updateCode: StatisticsUpdateCode, numberOfCards: number) {
    const setRef = this.getSetById(setId).ref;

     return this.firestore.firestore.runTransaction((transaction) => {
      return transaction.get(setRef).then((learningSetDoc) => {
        if (!learningSetDoc.exists) {
          throw new Error('Learning Set not found');
        }
  
        const learningSet = learningSetDoc.data() as LearningSet;
        const statistics = learningSet.statistics;
  
        switch (updateCode) {
          case StatisticsUpdateCode.CardLearned:
            statistics.learnedCards += numberOfCards;
          break;
          case StatisticsUpdateCode.CardNotLearned:
            statistics.learnedCards -= numberOfCards;
          break;
          case StatisticsUpdateCode.CardCreated:
            statistics.totalCards += numberOfCards;
          break;
          case StatisticsUpdateCode.CardDeleted:
            statistics.totalCards -= numberOfCards;
          break;
          case StatisticsUpdateCode.LearnedCardDeleted:
            statistics.learnedCards -= numberOfCards;
            statistics.totalCards -= numberOfCards;
          break;
        }  
        transaction.update(setRef, { statistics : statistics });
      });
    });
  }

  updateSet(set: LearningSet): Promise<void> {
    return this.firestore.doc(`learningSets/${set.id}`).update(set);
  }

  updateCard(card: Card, learningSetId: string): Promise<void> {
    const learningSetRef = this.firestore.collection('learningSets').doc(learningSetId);
    const cardsCollection = learningSetRef.collection('cards');
    return cardsCollection.doc(card.id).update(card);
  }

  deleteSet(id: string): Promise<void> {
    const learningSetRef = this.getSetById(id);
    const cardsRef = learningSetRef.collection('cards').ref;

    cardsRef.onSnapshot((snapshot) => {
      snapshot.docs.forEach(doc => {
        doc.ref.delete()
      })
    });
    return learningSetRef.delete();
  }

  deleteCard(id: string, learningSetId: string): Promise<void> {
    const learningSetRef = this.firestore.collection('learningSets').doc(learningSetId);
    const cardsCollection = learningSetRef.collection('cards');
    return cardsCollection.doc(id).delete();
  }

  deleteStatistics(id: string): Promise<void>{
    return this.firestore.doc(`learningSetsStatistics/${id}`).delete();
  }
}