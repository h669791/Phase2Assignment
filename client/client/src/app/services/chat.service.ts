// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor() {}

  // Send a text message to the chat server
  sendMessage(msg: { text: string; channelId: string }) {
    // Logic to send the message to a server, like using WebSocket or HTTP request
  }
}
