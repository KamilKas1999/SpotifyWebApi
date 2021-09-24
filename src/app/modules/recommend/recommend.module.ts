import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendRoutingModule } from './recommend-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PanelComponent, RecommendComponent],
  imports: [CommonModule, RecommendRoutingModule, FormsModule, SharedModule],
})
export class RecommendModule {}
