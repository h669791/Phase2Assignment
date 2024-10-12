// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { VideoComponent } from './video/video.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'chat', component: ChatComponent, title: 'Chat' },
  { path: 'video', component: VideoComponent, title: 'Video' },
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: '**', redirectTo: '/profile' },
];
