import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {OrderListModule} from 'primeng/orderlist';


@NgModule({
  imports: [
    HttpClientModule,
    OrderListModule
  ],
  exports : [
    HttpClientModule,
    OrderListModule
  ],
  declarations: []
})
export class SharedModule { }
