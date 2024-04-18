import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LearningSet } from '../models/learning-set';
import { StoreService } from './store.service';
import { StatisticsUpdateCode } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  currentLearningSet!: LearningSet ;
  constructor(private storeService: StoreService) { }

  cardsGroupedByBox = new BehaviorSubject<{ [key: number]: Card[] }>({});
  private selectedBox = new BehaviorSubject<number | null>(null);
  private selectedBoxCards = new BehaviorSubject<Card[] | null>(null);

  ///////// STATE //////////

  // Speichern des aktuellen Zustands der gruppierten Karten
  setCurrentCardsGroupedByBox(groupedCards: { [key: number]: Card[] }) {
    this.cardsGroupedByBox.next(groupedCards);
  }

  // Abrufen des aktuellen Zustands der gruppierten Karten
  getCurrentCardsGroupedByBox(): Observable<{ [key: number]: Card[] }> {
    return this.cardsGroupedByBox.asObservable();
  } 

  getNumberOfCardsInBox(boxIndex: number): number {
    const currentGrouping = this.cardsGroupedByBox.getValue();
    return currentGrouping[boxIndex] ? currentGrouping[boxIndex].length : 0;
  }

  setSelectedBox(boxNumber: number) {
    this.selectedBox.next(boxNumber);
  }

  getSelectedBox(): Observable<number | null> {
    return this.selectedBox.asObservable();
  }

  setSelectedBoxCards(cards: Card[]) {
    this.selectedBoxCards.next(cards);
  }

  getSelectedBoxCards(): Observable<Card[] | null> {
    return this.selectedBoxCards.asObservable();
  }

  getCards(): Observable<any[]> {
    return this.storeService.getCards(this.currentLearningSet.id);
  }

  getCardsGroupedByBox(): Observable<{ [key: number]: Card[] }> {
    return this.getCards().pipe(
      map(cards => this.groupCardsByBox(cards))
    );
  }

  private groupCardsByBox(cards: Card[]): { [key: number]: Card[] } {
    // Privater Code
  }

  getSetById(id: string){
    return this.storeService.getCardById(id);
  }

  addCard(card: Card): Promise<any> {
    // Privater Code
  }

  addCards(cards: Card[]): Promise<any> {
    return this.storeService.addCards(cards, this.currentLearningSet.id)
    .then(() => {
      return this.storeService.updateStatisticsForSeveralCards(this.currentLearningSet.id, StatisticsUpdateCode.CardCreated, cards.length);
    })
    .catch((error) => {
      console.error('Fehler beim Hinzufügen der Karten oder Aktualisieren der Statistik:', error);
    });
  }

  updateCard(card: Card): Promise<void> {
    return this.storeService.updateCard(card, this.currentLearningSet.id);
  }

  updateLearningStatusAndLeitnerBox(card: Card, newLearningStatus: string) {
    const setRef = this.storeService.getSetById(this.currentLearningSet.id);
    const cardRef = setRef.collection('cards').doc(card.id).ref;
   
    if(newLearningStatus === 'learned'){
      switch (card.leitnerBox) {
        case 1:
          card.leitnerBox +=1;
        break;
        case 2:
          card.leitnerBox +=1;
          this.storeService.updateStatistics(this.currentLearningSet.id, StatisticsUpdateCode.CardLearned);
        break;
      }
    }else{
      if(card.leitnerBox == 3){
        this.storeService.updateStatistics(this.currentLearningSet.id, StatisticsUpdateCode.CardNotLearned);
      }
      card.leitnerBox = 1;
    }

    if(card.learningStatus !== newLearningStatus ){
      cardRef.update({ 
        learningStatus: newLearningStatus,
        leitnerBox: card.leitnerBox 
      });
    }else{
      cardRef.update({ leitnerBox: card.leitnerBox });
    }
  }

  deleteCard(card: Card): Promise<void> {
    // Privater Code
  }
}