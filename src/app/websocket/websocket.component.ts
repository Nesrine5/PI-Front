import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessage } from '@stomp/stompjs';
import { WebSocketService } from 'app/services/chat/web-socket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {
  messageInput: string = '';
  chatMessages: string[] = [];
  notifications: string[] = [];
  private messageSubscription!: Subscription;
  private notificationSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    // Subscribe to incoming messages
    this.messageSubscription = this.webSocketService.getMessageStream().subscribe((message: string) => {
      const parsedMessage = JSON.parse(message);
      this.chatMessages.push(parsedMessage.content);
    });

    // Subscribe to incoming notifications
    this.notificationSubscription = this.webSocketService.getNotificationStream().subscribe((notification: string) => {
      const parsedNotification = JSON.parse(notification);
      this.notifications.push(parsedNotification.content);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from message and notification subscriptions
    this.messageSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }

  sendMessage(): void {
    if (this.messageInput.trim() !== '') {
      const message = this.messageInput;
      const notification = 'New message received: ' + message; // Create notification message
      this.webSocketService.sendMessage(message);
      this.webSocketService.sendNotification(notification); // Send notification
      // Clear the message input field after sending
      this.messageInput = '';
    }
  }

}
