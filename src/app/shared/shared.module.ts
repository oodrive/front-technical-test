import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {TreeModule} from 'primeng/tree';
import {CarouselModule} from 'primeng/carousel';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    TreeModule,
    CarouselModule,
    HttpClientModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
  ],
  exports : [
    TreeModule,
    CarouselModule,
    HttpClientModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
  ],
  declarations: []
})
export class SharedModule { }
