import { NgModule } from '@angular/core';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FilesManagerRoutingModule } from './files-manager-routing.module';
import { FilesManagerComponent } from './files-manager.component';
import { FilesManagerService } from './services/files-manager.service';

@NgModule({
    imports: [
        SharedModuleModule,
        FilesManagerRoutingModule,
    ],
    exports: [FilesManagerComponent, ModalFormComponent],
    declarations: [FilesManagerComponent, ModalFormComponent, DragDropComponent],
    providers: [FilesManagerService],
    entryComponents: [ModalFormComponent]
})

export class FilesManagerModule {
}
