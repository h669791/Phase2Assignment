// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  username: string;
  text: string;
  channelId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private apiUrl = 'http://localhost:3000/api/users'; // Replace with actual backend URL

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000'); // Connect to your server
  }

  // Register new user
  registerUser(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Authenticate user
  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Save user in the system (real-time use case)
  saveUser(user: { username: string; password: string; role: string }) {
    this.socket.emit('saveUser', user);
  }

  // Join a specific chat channel
  joinChannel(channelId: string) {
    this.socket.emit('joinChannel', channelId);
    console.log(`Joined channel: ${channelId}`);
  }

  // Send a message to a specific channel
  sendMessage(channelId: string, text: string) {
    const message: ChatMessage = { username: 'You', text, channelId };
    this.socket.emit('message', message);
  }

  // Listener for receiving messages from the server
  onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('message', (msg: ChatMessage) => {
        observer.next(msg);
      });
    });
  }
}
