import { Component, OnInit } from '@angular/core';
import { AdvancedSettings } from '../../models/advancedSettings.model';
import { RecommendService } from '../../services/recommend.service';

@Component({
  selector: 'app-panel-advanced',
  templateUrl: './panel-advanced.component.html',
  styleUrls: ['./panel-advanced.component.scss'],
})
export class PanelAdvancedComponent implements OnInit {
  advancedSettings: AdvancedSettings = new AdvancedSettings();

  constructor(private recommendService: RecommendService) {}

  ngOnInit(): void {
    this.changed();
  }

  resetAdvanced() {
    this.advancedSettings.minDuration = null;
    this.advancedSettings.maxDuration = null;
    this.advancedSettings.minTempo = null;
    this.advancedSettings.maxTempo = null;
    this.advancedSettings.minPopularity = null;
    this.advancedSettings.maxPopularity = null;
  }

  changed() {
    this.recommendService.advancedSettingsEmmiter.emit(this.advancedSettings);
  }
}
