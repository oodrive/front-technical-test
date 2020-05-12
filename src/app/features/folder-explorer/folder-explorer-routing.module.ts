import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderExplorerComponent } from './components/folder-explorer/folder-explorer.component';

const routes: Routes = [
  { path: '', component: FolderExplorerComponent },
  {
    path: ':id',
    component: FolderExplorerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderExplorerRoutingModule {}
