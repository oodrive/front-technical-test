import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
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
