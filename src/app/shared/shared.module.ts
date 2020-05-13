import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileFilterPipe } from './pipes/file-filter.pipe';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';

const PrimeNgModules = [
  ContextMenuModule,
  ButtonModule,
  DialogModule,
  BreadcrumbModule,
  FileUploadModule,
];

@NgModule({
  declarations: [FileFilterPipe],
  imports: [CommonModule, FormsModule, PrimeNgModules],
  exports: [FormsModule, FileFilterPipe, PrimeNgModules],
})
export class SharedModule {}
