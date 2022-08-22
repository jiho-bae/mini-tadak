import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const options: Partial<ManagerOptions & SocketOptions> = {
  secure: true,
  transports: ['websocket'],
};

const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL || '/';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function initSocket() {
  socket = io(socketUrl, options);

  socket.on('connect', () => {
    console.log('socket connect ✅');

    socket.on('disconnect', () => {
      console.log('socket disconnected ❌');
    });
  });

  return socket;
}

function leaveSocket() {
  socket.disconnect();
}

function isSocketDisconnected() {
  if (!socket || !socket?.connected) return true;

  return false;
}

export { initSocket, leaveSocket, isSocketDisconnected };
