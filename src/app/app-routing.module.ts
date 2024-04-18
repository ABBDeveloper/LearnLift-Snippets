import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CardsViewTabsComponent } from './components/cards-view-tabs/cards-view-tabs.component';
import { CardListPageModule } from './pages/card-list/card-list.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'my-learning-sets',
    pathMatch: 'full'
  },
  {
    path: 'my-learning-sets',
    loadChildren: () => import('./pages/my-learning-sets/my-learning-sets.module').then( m => m.MyLearningSetsPageModule)
  },
  {
    path: 'cards',
    component: CardsViewTabsComponent,
    children:[
      {
        path: 'card-list',
        loadChildren: () => import('./pages/card-list/card-list.module').then( m => m.CardListPageModule)
      },
      {
        path: 'add-edit-card',
        loadChildren: () => import('./pages/add-edit-card/add-edit-card.module').then( m => m.AddEditCardPageModule)
      },
      {
        path: 'learn-box-selection',
        loadChildren: () => import('./pages/learn-box-selection/learn-box-selection.module').then( m => m.LearnBoxSelectionPageModule),
      },
      
    ],
  },
  {
    path: 'learn',
    loadChildren: () => import('./pages/learn/learn.module').then( m => m.LearnPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
