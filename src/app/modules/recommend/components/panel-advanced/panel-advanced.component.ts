import { Component, OnInit } from '@angular/core';
import { AdvancedSettings } from '../../models/advancedSettings.model';
import { RecommendService } from '../../services/recommend.service';

@Component({
  selector: 'app-panel-advanced',
  templateUrl: './panel-advanced.component.html',
  styleUrls: ['./panel-advanced.component.scss'],
})
export class PanelAdvancedComponent implements OnInit {
  advancedSettings: AdvancedSettings;

  constructor(private recommendService: RecommendService) {}

  ngOnInit(): void {
    this.advancedSettings = this.recommendService.advancedSettings;
  }

  changed() {

  }
}
