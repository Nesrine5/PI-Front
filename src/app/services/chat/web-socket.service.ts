import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
    private messageSubject: Subject<string> = new Subject<string>();
    private notificationSubject: Subject<string> = new Subject<string>();


    constructor() {
        this.initializeWebSocketConnection();
    }

    private initializeWebSocketConnection(): void {
        const socket = new SockJS('http://localhost:8090/intership/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            console.log('WebSocket Connected');
            // Subscribe to incoming messages
            this.stompClient.subscribe('/topic/messages', (message: Message) => {
                this.messageSubject.next(message.body);
            });
            this.stompClient.subscribe('/topic/notifications', (notification: Message) => {
                this.notificationSubject.next(notification.body);
            });
        }, (error: any) => {
            console.error('Websocket Error', error);
        });
    }

    sendMessage(message: string): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send('/app/send/message', {}, JSON.stringify({ content: message }));
        } else {
            console.error('WebSocket is not connected.');
        }
    }

    getMessageStream(): Observable<string> {
        return this.messageSubject.asObservable();
    }
    getNotificationStream(): Observable<string> {
        return this.notificationSubject.asObservable();
    }
    sendNotification(notification: string): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send('/app/send/notification', {}, JSON.stringify({ content: notification }));
        } else {
            console.error('WebSocket is not connected.');
        }
    }

}
