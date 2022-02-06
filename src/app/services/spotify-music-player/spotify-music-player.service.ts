import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SongInfo } from 'src/app/modules/shared/models/songInfo.model';
import { MessageService } from '../message/message.service';
import { PlayerModeService } from '../player-mode/player-mode.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyMusicPlayerService {
  lastAddedTrack: SongInfo;
  player: Spotify.Player;
  currentStateEmitter = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private modeService: PlayerModeService
  ) {}

  disconnect() {
    if (this.player != null) {
      this.player.disconnect();
      this.player == null;
    }
  }

  initPlayer() {
    if (this.player == null) {
      this.player = this.createNewPlayer();
    }
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

  createNewPlayer() {
    const player = new Spotify.Player({
      name: 'Kamil recommendation music app',
      getOAuthToken: (cb) => {
        cb(localStorage.getItem('access_token'));
      },
      volume: 0.5,
    });
    player.addListener('ready', ({ device_id }) => {
      this.messageService.sendMessage(
        'Aplikacja jest widoczna w Spotify',
        'Połacz się z nią, by móc słuchać całych utworów'
      );
    });
    player.addListener('not_ready', ({ device_id }) => {
      this.messageService.sendMessage('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    player.addListener('authentication_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    player.addListener('account_error', ({ message }) => {
      this.messageService.sendMessage(message, '');
    });

    player.addListener('player_state_changed', (currentState) => {
      if (currentState == null) {
        this.messageService.sendMessage('Rozłączono', '');
        this.modeService.setMode(0);
      } else {
        this.modeService.setMode(1);
      }
      this.currentStateEmitter.emit(currentState);
    });
    return player;
  }
}
