import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { ImageUploadService } from '../services/image-upload.service';
import { SocketService } from '../services/socket.service';

interface ChatMessage {
  username: string;
  text: string;
  channelId?: string;
}

interface Channel {
  id: string;
  name: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  selectedFile: File | null = null;
  selectedChannel = ''; // Currently selected channel ID
  channels: Channel[] = []; // List of channels

  constructor(
    private chatService: ChatService,
    private imageUploadService: ImageUploadService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.loadChannels(); // Load available channels on initialization
    this.socketService.onMessage().subscribe((msg: ChatMessage) => {
      if (msg.channelId === this.selectedChannel) {
        this.messages.push(msg);
      }
    });
  }

  loadChannels() {
    this.channels = [
      { id: 'general', name: 'General' },
      { id: 'random', name: 'Random' },
      { id: 'support', name: 'Support' },
    ];
    this.selectedChannel = this.channels[0].id; // Default to the first channel
    this.joinChannel(this.selectedChannel);
  }

  joinChannel(channelId: string) {
    this.selectedChannel = channelId;
    this.socketService.joinChannel(channelId);
    this.messages = []; // Clear messages when switching channels
  }

  onChannelChange() {
    this.joinChannel(this.selectedChannel);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: ChatMessage = { username: 'You', text: this.newMessage, channelId: this.selectedChannel };
      this.socketService.sendMessage(this.selectedChannel, this.newMessage);
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  sendImage() {
    if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.imageUploadService.uploadImage(formData).subscribe({
            next: (response) => {
                const imageUrl = response.imagePath; // URL from server
                const messageData = { username: this.username, imageUrl };
                this.socketService.sendMessage(messageData);
            },
            error: (error) => console.error('Image upload failed:', error)
        });
    }
}

}
