import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { LearnPageRoutingModule } from './learn-routing.module';

import { LearnPage } from './learn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnPageRoutingModule
  ],
  declarations: [LearnPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LearnPageModule {}
