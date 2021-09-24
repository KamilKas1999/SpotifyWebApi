import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRoutingModule } from './top-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopComponent } from './pages/top/top.component';



@NgModule({
  declarations: [TopComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    SharedModule
  ]
})
export class TopModule { }
