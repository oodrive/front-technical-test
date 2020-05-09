import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderComponent } from './components/folder/folder.component';
import { FileFilterPipe } from './pipes/file-filter.pipe';

@NgModule({
  declarations: [FolderComponent, FileFilterPipe],
  imports: [CommonModule, FormsModule],
  exports: [FolderComponent],
})
export class SharedModule {}
