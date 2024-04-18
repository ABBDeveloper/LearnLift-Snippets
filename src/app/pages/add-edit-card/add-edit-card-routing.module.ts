import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditCardPage } from './add-edit-card.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditCardPageRoutingModule {}
