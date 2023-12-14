import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import {
  ConnectedFour,
} from './game.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const connectedFour = new ConnectedFour();
const { games } = connectedFour;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle new game creation
  socket.on('createGame', (gameId) => {
    connectedFour.createGame(gameId);
    socket.join(gameId);
    io.to(gameId).emit('updateGame', games[gameId]);
  });

  // Handle joining an existing game
  socket.on('joinGame', (gameId) => {
    if (games[gameId] && games[gameId].players.length === 1) {
      games[gameId].players.push({ id: 2 });
      socket.join(gameId);
      io.to(gameId).emit('updateGame', games[gameId].board);
    } else {
      // Handle invalid game or full game
      socket.emit('errorMessage', 'Invalid game ID or game is full');
    }
  });

  socket.on('move', ({ gameId, column, playerId }) => {
    const board = games[gameId] ? games[gameId].board : null;
    if (board === null) {
      return;
    }
    if (playerId !== games[gameId].toggle) {
      return;
    }
    connectedFour.move(gameId, column, playerId);
    const win = connectedFour.verifyWin(playerId, gameId);

    io.to(gameId).emit('update', games[gameId].board);
    if (win) {
      io.to(gameId).emit('win', playerId);
    }
  });

  socket.on('reset', (gameId) => {
    if (connectedFour.games[gameId]) {
      connectedFour.resetGame(gameId);
      io.to(gameId).emit('update', games[gameId].board);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
