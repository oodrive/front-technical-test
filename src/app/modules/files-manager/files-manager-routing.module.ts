import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilesManagerComponent } from './files-manager.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: FilesManagerComponent, data: { title: 'Folders' }
      },
    ])],
  exports: [RouterModule]
})
export class FilesManagerRoutingModule { }
