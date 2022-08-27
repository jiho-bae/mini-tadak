import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

const options: Partial<ManagerOptions & SocketOptions> = {
  secure: true,
  transports: ['websocket'],
};

type SocketMessageType = {
  [key: string]: string;
};

const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL || '/';

const socket = (function (url, opts) {
  let _socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  let _socketUrl = url;
  let _options = opts;

  function init() {
    _socket = io(_socketUrl, _options);

    _socket.on('connect', () => {
      console.log('socket connect ✅');

      _socket.on('disconnect', () => {
        console.log('socket disconnected ❌');
      });
    });

    return _socket;
  }

  function disconnect() {
    _socket.disconnect();
  }

  function isDisconnected() {
    if (!_socket || !_socket?.connected) return true;

    return false;
  }

  function emitEvent(eventName: string, message: SocketMessageType) {
    _socket.emit(eventName, message);
  }

  function listenEvent(eventName: string, cb: (...args: any[]) => void) {
    _socket.on(eventName, cb);
  }

  function removeListenEvent(eventName: string) {
    _socket.removeListener(eventName);
  }

  return { init, disconnect, isDisconnected, emitEvent, listenEvent, removeListenEvent };
})(socketUrl, options);

export default socket;
