import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatRadioModule, MatSelectModule,
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropDirective } from '../directives/drag-drop.directive';

@NgModule({
  declarations: [DragDropDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    DragDropDirective,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
})
export class SharedModuleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: []
    };
  }
}
