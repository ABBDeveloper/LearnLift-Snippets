import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLearningSetsPage } from './my-learning-sets.page';

const routes: Routes = [
  {
    path: '',
    component: MyLearningSetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLearningSetsPageRoutingModule {}
