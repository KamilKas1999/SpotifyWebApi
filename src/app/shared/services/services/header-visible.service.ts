import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibleService {

  status = new EventEmitter<boolean>();

  constructor() { }
}
