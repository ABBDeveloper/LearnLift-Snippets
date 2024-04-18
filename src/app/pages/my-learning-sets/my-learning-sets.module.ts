import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLearningSetsPageRoutingModule } from './my-learning-sets-routing.module';

import { MyLearningSetsPage } from './my-learning-sets.page';
import { SortLearningSetsPipe } from 'src/app/pipes/sort-learning-sets.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLearningSetsPageRoutingModule,
  ],
  declarations: [MyLearningSetsPage, SortLearningSetsPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
})
export class MyLearningSetsPageModule {}
