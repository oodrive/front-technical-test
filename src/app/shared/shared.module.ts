import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ContextMenuModule} from 'primeng/contextmenu';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {BreadcrumbModule} from 'primeng/breadcrumb';


@NgModule({
  imports: [
    ToastModule,
    BreadcrumbModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    SplitButtonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    ContextMenuModule,
  ],
  exports : [
    ToastModule,
    BreadcrumbModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    SplitButtonModule,
    ButtonModule,
    FileUploadModule,
    DialogModule,
    InputTextModule,
    ContextMenuModule
  ],
  declarations: []
})
export class SharedModule { }
