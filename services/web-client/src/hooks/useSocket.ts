import { useCallback, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type IHandler<T = any> = (data: T) => void;

export interface IUseSocket {
    connect: () => void;
    disconnect: () => void;
    subscribe: (event: string, handler?: any) => void;
    unsubscribe: (event: string, handler?: any) => void;
    emit: (event: string, data?: any) => void;
    emitAnyway: (event: string, data?: any) => void;
    isConnected: boolean;
}


interface IProps {
    url: string;
    connectionOptions?: object;
}

export const useSocket = ({ url, connectionOptions = {} }: IProps): IUseSocket => {
    const eventsToSendRef = useRef<Record<string, any>>();
    const socketRef = useRef<Socket | null>(null);
    const isConnecting = useRef(false);
    const eventListeners = useRef<Record<string, any>>({});
    const [isConnected, setIsConnected] = useState(false);

    const emit = useCallback(
        (event: string, data: any) =>
            new Promise<void>((resolve, reject) => {
                if (socketRef.current) {
                    socketRef.current.emit(event, data, (err: any, result: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } else {
                    resolve();
                }
            }),
        [],
    );

    // eslint-disable-next-line consistent-return
    const emitAnyway = useCallback(
        (event: string, data: any) => {
            if (socketRef.current) {
                return emit(event, data);
            }
            if (!eventsToSendRef.current) {
                eventsToSendRef.current = [];
            }
            eventsToSendRef.current.push({
                event,
                data,
            });
        },
        [emit],
    );

    const subscribe = useCallback(
        (event: string, handler: IHandler) => {
            if (socketRef.current) {
                socketRef.current.on(event, handler);
            }
            eventListeners.current[event] = eventListeners.current[event] || [];
            eventListeners.current[event].push(handler);
        },
        [socketRef.current],
    );

    const unsubscribe = useCallback((event: string, handler: IHandler) => {
        if (socketRef.current) {
            socketRef.current.removeListener(event, handler);
        }

        if (eventListeners.current[event]?.length) {
            eventListeners.current[event] = eventListeners.current[event].filter((el: any) => el !== handler);

            if (!eventListeners.current[event]?.length) {
                delete eventListeners.current[event];
            }
        }
    }, []);

    const connect = useCallback(() => {
        if (isConnecting.current || socketRef.current) {
            return;
        }
        isConnecting.current = true;
        const socket = io(url, {
            transports: ['websocket'],
            ...connectionOptions,
        });
        const events = Object.keys(eventListeners.current);
        events.map((event) => {
            eventListeners.current[event].map((handler: IHandler) => {
                socket.on(event, handler);
            });
        });
        socket.on('connect', () => {
            isConnecting.current = false;
            socketRef.current = socket;
            if (eventsToSendRef.current) {
                eventsToSendRef.current.map(({ event, data }: any) => emit(event, data));
                eventsToSendRef.current = [];
            }
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            socketRef.current = null;
            isConnecting.current = false;
            setIsConnected(false);
        });

        socket.on('connect_error', () => {
            setIsConnected(false);
            socket.connect();
        });
    }, []);

    const disconnect = useCallback((clearCache = true) => {
        if (!socketRef.current) {
            return;
        }
        socketRef.current.disconnect();
        if (clearCache) {
            eventsToSendRef.current = [];
        }
    }, []);

    return {
        connect,
        disconnect,
        subscribe,
        unsubscribe,
        emit,
        emitAnyway,
        isConnected,
    };
};
