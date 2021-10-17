import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { RecommendService } from 'src/app/modules/recommend/services/recommend.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @ViewChild('form', { static: false }) signupForm: NgForm;

  advancedVisible = false;
  primaryVisible = true;
  isLoading: boolean = false;

  @Output() newItemEvent = new EventEmitter<never>();

  constructor(private recommendService: RecommendService) {}

  ngOnInit(): void {
    this.recommendService.isLoadingEmmiter.subscribe((isLoading) => {
      this.isLoading = isLoading;
      console.log(isLoading);
    });
  }

  onRecommend() {
    this.newItemEvent.emit();
    this.recommendService.getRecommend().subscribe();
  }

  onAdvanceButton() {
    this.advancedVisible = !this.advancedVisible;
  }

  onPrimaryButton() {
    this.primaryVisible = !this.primaryVisible;
  }
}
