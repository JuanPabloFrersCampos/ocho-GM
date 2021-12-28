import alt from 'alt-server';
import * as chat from '../chat';

const handleConnect = player => {
  player.spawn(-1291.71, 83.43, 54.89, 1000); // Spawns after 1 second.
  player.model = `mp_m_freemode_01`;
  chat.broadcast(`==> ${player.name} has joined.`);
}

export const deadPlayers = {};
const timeBetweenRespawn = 5000;

const handleDeath = player => {
  alt.log(player);
  if (deadPlayers[player.id]){
    return;
  }

  deadPlayers[player.id] = true;
  alt.setTimeout((player) => {
    if (deadPlayers[player.id]){
      delete deadPlayers[player.id];
    }

    if (!player || !player.valid){
      return;
    }

    handleConnect(player);
  }, timeBetweenRespawn);
}

alt.on('playerConnect', handleConnect);
alt.on('playerDeath', handleDeath)