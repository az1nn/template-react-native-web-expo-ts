import { useEffect, useRef, useState, useCallback } from 'react';
import { createSocket, connectSocket, disconnectSocket } from '../services/socket';

interface UseSocketOptions {
  url: string;
  autoConnect?: boolean;
}

interface UseSocketReturn {
  isConnected: boolean;
  emit: (event: string, data?: unknown) => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  off: (event: string, handler?: (...args: unknown[]) => void) => void;
}

export const useSocket = ({ url, autoConnect = true }: UseSocketOptions): UseSocketReturn => {
  const socketRef = useRef(createSocket(url));
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const s = socketRef.current;

    s.on('connect', () => setIsConnected(true));
    s.on('disconnect', () => setIsConnected(false));

    if (autoConnect) {
      connectSocket(s);
    }

    return () => {
      disconnectSocket(s);
      s.removeAllListeners();
    };
  }, [autoConnect]);

  const emit = useCallback((event: string, data?: unknown) => {
    socketRef.current?.emit(event, data);
  }, []);

  const on = useCallback((event: string, handler: (...args: unknown[]) => void) => {
    socketRef.current?.on(event, handler);
  }, []);

  const off = useCallback((event: string, handler?: (...args: unknown[]) => void) => {
    if (handler) {
      socketRef.current?.off(event, handler);
    } else {
      socketRef.current?.off(event);
    }
  }, []);

  return {
    isConnected,
    emit,
    on,
    off,
  };
};
