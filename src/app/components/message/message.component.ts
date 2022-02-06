import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateX(100vw)',
        })
      ),
      transition('open => closed', [animate('0.7s ease')]),
      transition('closed => open', [animate('1s ease')]),
    ]),
    trigger('newMessage', [
      state(
        'rise',
        style({
          background: 'white',
        })
      ),
      state(
        'standard',
        style({
          background:
            'white',
        })
      ),
      transition('rise <=> standard', [animate('0.2s ease')]),
    ]),
  ],
})
export class MessageComponent implements OnInit, OnDestroy {
  private messageSub: Subscription;
  private trackNameSub: Subscription;
  private isNewMessageSub: Subscription;
  message: string;
  trackName: string;
  isMessage: boolean;
  isNewMessage: boolean = true;
  timeout: any;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageSub = this.messageService.messageSender.subscribe(
      (message) => (this.message = message)
    );
    this.trackNameSub = this.messageService.trackNameSender.subscribe(
      (trackName) => (this.trackName = trackName)
    );
    this.isNewMessageSub = this.messageService.isMessage.subscribe(
      (isMessage) => {
        this.isMessage = isMessage;
        this.isNewMessage = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.isNewMessage = false;
        }, 200);
      }
    );
  }

  close(): void {
    this.messageService.cancelMessage();
  }
  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
    this.trackNameSub.unsubscribe();
    this.isNewMessageSub.unsubscribe();
  }
}
