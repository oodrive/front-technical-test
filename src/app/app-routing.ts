import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'folders',
        pathMatch: 'full',
    },
    { path: 'folders', loadChildren: './modules/files-manager/files-manager.module#FilesManagerModule' },
];
