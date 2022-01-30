import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendRoutingModule } from './recommend-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PanelPrimaryComponent } from './components/panel-primary/panel-primary.component';
import { PanelAdvancedComponent } from './components/panel-advanced/panel-advanced.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [PanelComponent, RecommendComponent, PanelPrimaryComponent, PanelAdvancedComponent, ModalComponent],
  imports: [CommonModule, RecommendRoutingModule, FormsModule, SharedModule],
})
export class RecommendModule {}
