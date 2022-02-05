import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SpotifyPlayerCurrentState } from 'src/app/models/SpotifyPlayerCurrentState.model';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyMusicPlayerService {
  lastAddedTrack: SongInfo;
  player: Spotify.Player;
  currentStateEmitter = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  initPlayer() {
    this.messageService.sendMessage('Trwa łączenie', '');
    const token = localStorage.getItem('access_token');
    this.player = new Spotify.Player({
      name: 'Kamil recommendation app',
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.5,
    });
    this.player.addListener('ready', ({ device_id }) => {
      this.messageService.sendMessage(
        'Połaczona z urządzeniem',
        'Połacz się teraz w aplikacji Spotify z tym urządzeniem'
      );
    });
    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      this.messageService.sendMessage('Device ID has gone offline', device_id);
    });

    this.player.addListener('initialization_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    this.player.addListener('authentication_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    this.player.addListener('account_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    this.player.addListener('player_state_changed', (d) => {
      this.currentStateEmitter.emit(d);
    });
    this.player.connect();
  }
  addToQueue(track: SongInfo) {
    if (this.lastAddedTrack && this.lastAddedTrack.id === track.id) {
      this.messageService.sendMessage(
        'Ten utwór już dodano do kolejki',
        track.name
      );
      return;
    }
    this.lastAddedTrack = track;
    this.http
      .post(
        'https://api.spotify.com/v1/me/player/queue?uri=' +
          track.external_urls.spotify,
        {
          uri: track.external_urls.spotify,
        }
      )
      .subscribe(
        (result) => {
          this.messageService.sendMessage('Dodano do kolejki', track.name);
        },
        (error) => {
          this.messageService.sendMessage('Nie znaleziono urządzenia', '');
          this.lastAddedTrack = null;
        }
      );
  }
  skipNext() {
    this.player.nextTrack().then();
  }

  skipPrev() {
    this.player.nextTrack().then();
  }
  pause() {
    this.player.pause().then();
  }
  resume() {
    this.player.resume().then();
  }

  setVolume(value: number) {
    this.player.setVolume(value);
  }
}
