import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
