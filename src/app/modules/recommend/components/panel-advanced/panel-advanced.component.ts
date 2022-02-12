import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdvancedSettings } from '../../models/advancedSettings.model';
import { RecommendService } from '../../services/recomendation/recommend.service';

@Component({
  selector: 'app-panel-advanced',
  templateUrl: './panel-advanced.component.html',
  styleUrls: ['./panel-advanced.component.scss'],
})
export class PanelAdvancedComponent implements OnInit {
  advancedSettings: AdvancedSettings;
  hideComponent = false;
  tempValueDesc = 'Średnie';
  danceValueDesc = 'Średnia';
  instrValueDesc = 'Średnia';
  energyValueDesc = 'Średnia';
  accousticValueDesc = 'Średnia';
  accousticSpechDesc = 'Średni';
  recommendSub: Subscription;

  constructor(private recommendService: RecommendService) {}

  ngOnInit(): void {
    this.advancedSettings = this.recommendService.advancedSettings;
    this.recommendSub = this.recommendService.recommendChanged.subscribe(
      () => this.hideComponent = true
    );
  }

  onHide() {
    this.hideComponent = !this.hideComponent;
  }

  changed() {
    this.refreshTempValueDesc();
    this.refreshDanceValueDesc();
    this.refreshEnergyValueDesc();
    this.refreshInstrValueDesc();
    this.refreshAccousticValueDesc();
    this.refreshSpechDesc();
  }
  private refreshSpechDesc() {
    if (this.advancedSettings.speechiness < 0.33) {
      this.accousticSpechDesc = 'Mały';
    } else if (this.advancedSettings.speechiness > 0.66) {
      this.accousticSpechDesc = 'Duży';
    } else {
      this.accousticSpechDesc = 'Średnie';
    }
  }
  private refreshTempValueDesc() {
    if (this.advancedSettings.tempo < 54) {
      this.tempValueDesc = 'Małe';
    } else if (this.advancedSettings.tempo > 107) {
      this.tempValueDesc = 'Duże';
    } else {
      this.tempValueDesc = 'Średnie';
    }
  }
  private refreshDanceValueDesc() {
    if (this.advancedSettings.danceability < 0.33) {
      this.danceValueDesc = 'Mała';
    } else if (this.advancedSettings.danceability > 0.66) {
      this.danceValueDesc = 'Duża';
    } else {
      this.danceValueDesc = 'Średnia';
    }
  }
  private refreshEnergyValueDesc() {
    if (this.advancedSettings.energy < 0.33) {
      this.energyValueDesc = 'Mała';
    } else if (this.advancedSettings.energy > 0.66) {
      this.energyValueDesc = 'Duża';
    } else {
      this.energyValueDesc = 'Średnia';
    }
  }
  private refreshInstrValueDesc() {
    if (this.advancedSettings.instrumentalness < 0.33) {
      this.instrValueDesc = 'Mała';
    } else if (this.advancedSettings.instrumentalness > 0.66) {
      this.instrValueDesc = 'Duża';
    } else {
      this.instrValueDesc = 'Średnia';
    }
  }
  private refreshAccousticValueDesc() {
    if (this.advancedSettings.acousticness < 0.33) {
      this.accousticValueDesc = 'Mała';
    } else if (this.advancedSettings.acousticness > 0.66) {
      this.accousticValueDesc = 'Duża';
    } else {
      this.accousticValueDesc = 'Średnia';
    }
  }
}
