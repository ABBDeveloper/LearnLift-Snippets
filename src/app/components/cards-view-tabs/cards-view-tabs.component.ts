import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { LearningSet } from 'src/app/models/learning-set';

@Component({
  selector: 'app-cards',
  templateUrl: './cards-view-tabs.component.html',
  styleUrls: ['./cards-view-tabs.component.scss'],
})

export class CardsViewTabsComponent   {
  constructor(private cardService: CardService, private router: Router, private cdr: ChangeDetectorRef) { }

  backToSets(){
    this.router.navigate(['/my-learning-sets']);
    this.cardService.currentLearningSet =  new LearningSet('');
    this.cdr.detectChanges(); 
  }

  getCurrentLearningSetName(): string{
    return this.cardService.currentLearningSet.name;
  }
}