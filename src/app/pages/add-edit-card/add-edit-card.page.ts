import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { AICardCreator } from 'src/app/models/aicard-creator';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { OpenAIFunctionService } from '../../services/open-aifunction.service';
import { CardInterface } from 'src/app/interfaces/card.interface';
import { CardResponse } from 'src/app/interfaces/cardResponse.interface';
import { of } from 'rxjs';
import {  IonToast } from '@ionic/angular';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
import { ImageService } from '../../services/image.service';
import { isBlobLike } from 'openai/uploads';


const SUCCESS = 'success';
const FAIL = 'fail';
@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.page.html',
  styleUrls: ['./add-edit-card.page.scss'],
})

export class AddEditCardPage implements OnInit {
  @ViewChild(IonToast) toast?: IonToast;


  card: Card = new Card('','');

  cardCreationType: string =  this.setDefaultCardCreationType();
  exampleQuestion = 'How does a diesel engine work?';
  exampleAnswer = 'A diesel engine operates by compressing air and diesel fuel, followed by the self-ignition of the mixture due to high temperatures, resulting in the generation of mechanical energy.';
  exampleFront = 'Car';
  exampleBack = 'Coche';
  exampleTopic = 'English grammar for the 5th grade';
  exampleLanguage = 'German';
  aiCardCreator = new AICardCreator('','');

  topic = '';
  language = '';
  numberOfCards = 0;

  isLoading= false;
  imageDeleted: boolean = false;

  constructor(
    private cardService : CardService,
    private oaiService: OpenAIFunctionService,
    private router: Router,
    private imageService: ImageService
  ){}
  
  ngOnInit() {
    this.getCardFromState();    
  }

  private getCardFromState() {
   // Privater Code
  }

  setDefaultCardCreationType(): string{
    if(this.cardService.currentLearningSet.category === 'Languages'){
     return 'compactCard';
    }else{
      return 'questionAnswerCard';
    }
  }

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt // oder CameraSource.Camera für die Kamera
      });
  
      if(image.base64String){
        this.card.imageUrl =`data:image/jpeg;base64,${image.base64String}`;
        const imageBlob = this.imageService.base64ToBlob(image.base64String);
        //COMPRESS
        const compressedImageBlob = await this.imageService.compressImage(imageBlob);
        this.imageService.selectedImageBlob = compressedImageBlob;
      }else {
        console.error('Bildpfad ist undefined');
      }
    } catch (error) {
      console.error('Fehler beim Auswählen des Bildes:', error);
    }
  }

  deleteImage(imagePath: string){
    this.card.imageUrl = '';
    this.imageDeleted = true;
    this.imageService.selectedImageBlob = null;
  }

  cancel(){
    this.resetCard();
    if(this.isExistingCard()){
      this.router.navigate(['/card-list']);
    }else{
      this.router.navigate(['/cards/learn-box-selection']);
    }
  }

  async save(){
    if(this.isCardSeted()){
      this.card.type = this.cardCreationType;
      if(this.imageService.selectedImageBlob){
        console.log(this.imageService.selectedImageBlob);
        try {
          const uploadedImageUrl = await this.imageService.uploadImage('cardImages');
          this.card.imageUrl = uploadedImageUrl;
        } catch (error) {
          console.error('Fehler beim Hochladen des Bildes:', error);
          return; 
        }
      }else if(this.imageService.selectedImageBlob === null && this.imageDeleted){
        this.imageService.deleteCardImage(this.card.imageUrl);
      }
      if(this.isExistingCard()){
        this.cardService.updateCard(this.card);
      }else{
        this.cardService.addCard(this.card);
      }
    }
    this.resetCard();
  }

  generateCardsWithAI() {
    // Privater Code
  }
  
  saveGeneratedCards(cards:  Card[]) {
    cards.forEach(card => {
      card.type = setCardTypeByLength(card);
    });

    try {
      this.cardService.addCards(cards);
    } catch (error) {
      console.error('Fehler beim Speichern der Karten', error);
    }
    console.log(`${cards.length} Karten erfolgreich gespeichert.`);
  }

  async presentToast(message:string, toastClass: string) {
    if (this.toast) {
      this.toast.message = message;
      this.toast.position = 'bottom';
      this.toast.cssClass = toastClass;
      if(toastClass === SUCCESS){
        this.toast.duration = 1000;
      }else{
        this.toast.duration = 5000;
      }
      await this.toast.present();
    }
  }

  isCardSeted(): boolean{
    return (this.card.front !=='' && this.card.back !=='' );
  }

  isExistingCard(): boolean{
    return this.card.id !=='';
  }

  resetCard() {
    this.card = new Card('','');
  }

  resetAiCardCreator() {
    this.aiCardCreator = new AICardCreator('','');
  }

  isWordSeted(): boolean{
    return (this.card.front !=='' && this.card.back !=='' );
  }
}

function setCardTypeByLength(card: Card): string {
  if(card.back.length > 200){
    return 'questionAnswerCard';
  }else{
    return 'compactCard';
  }
}
