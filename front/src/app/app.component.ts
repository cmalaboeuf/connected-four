// app.component.ts

import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private socket: any;
  public board: any[][] = []; // You may need to adjust the data structure based on your design
  public connected: boolean = false;
  public playerId = 1;

  public gameName = '';

  public winMessage = '';
  public errorMessage = '';

  constructor() {
    this.socket = io('http://localhost:3000');

    // Initialize the board and handle updates from the server
    this.initBoard();
    this.socket.on('connect', () => {
      this.connected = true;
    });
    this.socket.on('unconnect', () => {
      this.connected = true;
    });
    this.socket.on('update', (data: any) => {
      // Update the local board with the received data from the server
      this.board = data;
    });

    this.socket.on('updateGame', (data: any) => {
      // Update the local board with the received data from the server
      this.board = data;
    });

    this.socket.on('win', (player: string) => {
      // Update the local board with the received data from the server
      this.winMessage = `Player ${player} has win! `;
    });
    
    this.socket.on('errorMessage', (message: string) => {
      // Update the local board with the received data from the server
      this.errorMessage = message;
    });
  }

  initBoard() {
    // Initialize the board with empty cells
    for (let i = 0; i < 6; i++) {
      this.board[i] = [];
      for (let j = 0; j < 7; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  makeMove(column: number) {
    // Handle player's move and emit it to the server
    this.socket.emit('move', {
      gameId: this.gameName,
      playerId: this.playerId,
      column,
    });
  }

  reset() {
    this.socket.emit('reset', this.gameName);
    this.initBoard();
  }

  createGame() {
    this.initBoard();
    this.playerId = 1;
    this.winMessage = '';
    this.socket.emit('createGame', this.gameName);
  }

  joinGame() {
    this.initBoard();
    this.winMessage= '';
    this.playerId = 2;
    this.socket.emit('joinGame', this.gameName);
  }
}
