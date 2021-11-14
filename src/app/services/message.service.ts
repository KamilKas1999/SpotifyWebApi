import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSender = new EventEmitter<string>();
  trackNameSender = new EventEmitter<string>();
  isMessage = new EventEmitter<boolean>();
  timeout: any;
  constructor() {}

  sendMessage(message: string, trackName: string): void {
    this.messageSender.next(message);
    this.trackNameSender.next(trackName);
    this.isMessage.next(true);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.cancelMessage();
    }, 5000);
  }

  cancelMessage(): void {
    this.isMessage.next(false);
  }
}
