import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-folder',
    loadChildren: () =>
      import('./features/folder-explorer/folder-explorer.module').then(
        (m) => m.FolderExplorerModule
      ),
  },
  {
    path: '**',
    redirectTo: '/my-folder',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
