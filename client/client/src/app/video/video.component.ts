import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Peer, { MediaConnection } from 'peerjs';

@Component({
  selector: 'app-video',
  standalone: true,
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  imports: [CommonModule]
})
export class VideoComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  private peer!: Peer;
  private call!: MediaConnection;
  private localStream!: MediaStream;

  audioEnabled = true;
  videoEnabled = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePeer();
    }
  }

  private async initializePeer() {
    this.peer = new Peer();
  
    if (isPlatformBrowser(this.platformId)) {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
  
      this.localVideo.nativeElement.srcObject = this.localStream;
      this.localVideo.nativeElement.play();
  
      this.peer.on('call', (incomingCall) => {
        incomingCall.answer(this.localStream);
        incomingCall.on('stream', (remoteStream: MediaStream) => {
          this.remoteVideo.nativeElement.srcObject = remoteStream;
          this.remoteVideo.nativeElement.play();
        });
        this.call = incomingCall;
      });
    }
  }
  

  startCall(peerId: string) {
    if (isPlatformBrowser(this.platformId) && this.localStream) {
      this.call = this.peer.call(peerId, this.localStream);
      this.call.on('stream', (remoteStream: MediaStream) => {
        this.remoteVideo.nativeElement.srcObject = remoteStream;
        this.remoteVideo.nativeElement.play();
      });
    }
  }

  endCall() {
    if (this.call) {
      this.call.close();
      this.remoteVideo.nativeElement.srcObject = null;
    }
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    this.localStream.getAudioTracks()[0].enabled = this.audioEnabled;
  }

  toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    this.localStream.getVideoTracks()[0].enabled = this.videoEnabled;
  }
}
