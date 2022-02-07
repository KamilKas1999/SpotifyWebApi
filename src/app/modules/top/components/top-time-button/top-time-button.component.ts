import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-time-button',
  templateUrl: './top-time-button.component.html',
  styleUrls: ['./top-time-button.component.scss'],
})
export class TopTimeButtonComponent implements OnInit {
  @Output('time-range') timeRangeEmitter = new EventEmitter<string>();
  activeButtonNumber: number = 1;

  constructor() {}

  emitTimeRange(timeRange: string): void {
    if (timeRange == 'long_term') {
      this.activeButtonNumber = 0;
    } else if (timeRange == 'medium_term') {
      this.activeButtonNumber = 1;
    } else if (timeRange == 'short_term') {
      this.activeButtonNumber = 2;
    }
    this.timeRangeEmitter.emit(timeRange);
  }

  ngOnInit(): void {}
}
