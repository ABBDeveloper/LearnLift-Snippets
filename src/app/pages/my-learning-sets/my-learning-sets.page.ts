import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/enums';
import { LearningSet } from 'src/app/models/learning-set';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { LearningSetService } from 'src/app/services/learning-set.service';
import { Observable } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-my-learning-sets',
  templateUrl: './my-learning-sets.page.html',
  styleUrls: ['./my-learning-sets.page.scss'],
})
export class MyLearningSetsPage implements OnInit {

  @ViewChild(IonModal) modal?: IonModal;

  currentLearningSet: LearningSet = new LearningSet('');
  currentLearningSetCopy: LearningSet =  JSON.parse(JSON.stringify(this.currentLearningSet)); 

  learningSets!: Observable<any[]>;

  isModalOpen = false;
  modalTitle = 'New Set';
  imageIsSelected = false;
  categories: Category[] = ['Languages' , 'Natural Sciences' , 'IT', 'Humanities', 'Medicine', 'Business' , 'Art', 'Other'];

// Privater Code

  /////////// SLIDE OPTIONS////////////////
  editSet(set: LearningSet){
    this.modalTitle = 'Edit Set';
    this.currentLearningSet = set;
    this.currentLearningSetCopy = JSON.parse(JSON.stringify(this.currentLearningSet)); 
    this.modal?.present();
  }

  deleteSet(set: LearningSet){
    this.learningSetService.deleteSet(set);
  }

  ///////// ADD/EDIT SET MODAL //////////
  async save(){
    if(this.isSetSeted()){
      if(this.imageService.selectedImageBlob){
        console.log(this.imageService.selectedImageBlob);
        try {
          const uploadedImageUrl = await this.imageService.uploadImage('learningSetsImages');
          this.currentLearningSet.imageUrl = uploadedImageUrl;

        } catch (error) {
          console.error('Fehler beim Hochladen des Bildes:', error);
          return; 
        }
      }
      if(this.currentLearningSet.id){
        await this.learningSetService.updateSet(this.currentLearningSet);
      }else{
        await this.learningSetService.addSet(this.currentLearningSet);
      }
      this.resetSet();
    }
    this.modal?.dismiss();
  }

  cancel(){
    this.currentLearningSet.name = this.currentLearningSetCopy.name;
    this.currentLearningSet.category = this.currentLearningSetCopy.category;
    this.currentLearningSet.imageUrl = this.currentLearningSetCopy.imageUrl;
    this.modal?.dismiss();
    this.resetSet();
  }

  setCategoryOfLearnigSet(category: Category){
    this.currentLearningSet.category = category;
  }

  setImageOfLearnigSet(imgUrl: string){
    this.currentLearningSet.imageUrl = imgUrl;
    this.currentLearningSet.isCustomImage = false;
  }

  setOwnImageOfLearnigSet(){
    this.selectImage();
  }

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
  
      if(image.base64String){
        this.currentLearningSet.imageUrl =`data:image/jpeg;base64,${image.base64String}`;
        const imageBlob = this.imageService.base64ToBlob(image.base64String);
        this.imageService.selectedImageBlob = imageBlob;
        this.currentLearningSet.isCustomImage = true;
      }else {
        console.error('Bildpfad ist undefined');
      }
    } catch (error) {
      console.error('Fehler beim Auswählen des Bildes:', error);
    }
  }
}
