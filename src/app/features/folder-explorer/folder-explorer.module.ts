import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderExplorerComponent } from './components/folder-explorer/folder-explorer.component';
import { FolderExplorerRoutingModule } from './folder-explorer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromFileExplorer from './state/folder-explorer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FileExplorerEffects } from './state/folder-explorer.effects';


@NgModule({
  declarations: [FolderExplorerComponent],
  imports: [
    CommonModule, SharedModule, FolderExplorerRoutingModule,
    StoreModule.forFeature(fromFileExplorer.featureKey, fromFileExplorer.reducer),
    EffectsModule.forFeature([FileExplorerEffects])
  ]
})
export class FolderExplorerModule { }
