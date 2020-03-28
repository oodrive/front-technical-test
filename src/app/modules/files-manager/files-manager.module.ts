import { NgModule } from '@angular/core';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { FilesManagerRoutingModule } from './files-manager-routing.module';
import { FilesManagerComponent } from './files-manager.component';
import { FilesManagerService } from './services/files-manager.service';

@NgModule({
    imports: [
        SharedModuleModule,
        FilesManagerRoutingModule,
    ],
    exports: [FilesManagerComponent],
    declarations: [FilesManagerComponent],
    providers: [FilesManagerService],
})

export class FilesManagerModule {
}
