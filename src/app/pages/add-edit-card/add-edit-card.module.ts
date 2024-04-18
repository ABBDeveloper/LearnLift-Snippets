import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditCardPageRoutingModule } from './add-edit-card-routing.module';

import { AddEditCardPage } from './add-edit-card.page';
import { CardAnimationComponent } from 'src/app/components/card-animation/card-animation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditCardPageRoutingModule,
  ],
  declarations: [AddEditCardPage,CardAnimationComponent]
})
export class AddEditCardPageModule {}
