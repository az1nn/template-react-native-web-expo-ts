import { io, Socket } from 'socket.io-client';

interface SocketOptions {
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
}

const defaultOptions: SocketOptions = {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
};

export const createSocket = (url: string, options?: SocketOptions): Socket => {
  const mergedOptions = { ...defaultOptions, ...options };
  return io(url, mergedOptions);
};

export const connectSocket = (socket: Socket): void => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = (socket: Socket): void => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export type { Socket };
