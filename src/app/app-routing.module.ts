import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './composant/add-item/add-item.component';
import { ListeItemsComponent } from './composant/liste-items/liste-items.component';


const routes: Routes = [
  { path: 'add-item', component: AddItemComponent },
  { path: 'items', component: ListeItemsComponent },
  { path: '', component: ListeItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
