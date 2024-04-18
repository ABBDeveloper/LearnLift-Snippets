import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit {


  cards!: Observable<any[]>;
  cardsGroupedByBox!: { [key: number]: Card[] };
  selectedBoxCards = 'box1';

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit() {
    this.cardService.getCurrentCardsGroupedByBox().subscribe(groupedCards => {
      this.cardsGroupedByBox = groupedCards;
    });  
  }

  deleteCard(card: Card){
    this.cardService.deleteCard(card);
  }

  editWord(card: Card){
    this.router.navigate(['/cards/add-edit-card'], { state: { cardToEdit : card } });
  }
}