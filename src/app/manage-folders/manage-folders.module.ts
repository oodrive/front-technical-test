import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFoldersComponent } from './manage-folders.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ItemService } from '../services/item.service';

const appRoutes : Routes= [
    {
      path        : '',
      component : ManageFoldersComponent
    }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  providers : [ItemService],
  declarations: [ManageFoldersComponent]
})
export class ManageFoldersModule { }
