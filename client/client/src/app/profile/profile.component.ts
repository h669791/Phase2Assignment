import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../services/image-upload.service';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';
  password = ''; // For login/register
  profileImageUrl = 'assets/default-profile.png';
  selectedFile: File | null = null;
  isLoginMode = true; // Track if login mode is active
  isRegisterMode = false; // Track if register mode is active

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.username = user.username || '';
      this.email = user.email || '';
    }
  }

  // Toggle to login mode
  toggleLogin() {
    this.isLoginMode = true;
    this.isRegisterMode = false;
  }

  // Toggle to register mode
  toggleRegister() {
    this.isLoginMode = false;
    this.isRegisterMode = true;
  }

  // Handle user login
  loginUser() {
    console.log(`Logging in user: ${this.username}`);
  }

  // Handle user registration
  registerUser() {
    console.log(`Registering user: ${this.username}, Email: ${this.email}`);
  }

  // Handle file selection for profile image
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.selectedFile = input.files[0];
  }

  // Upload profile image
  uploadImage() {
    if (this.selectedFile) {
      this.imageUploadService.uploadProfileImage(this.selectedFile).subscribe((response: any) => {
        this.profileImageUrl = response.imagePath;
        console.log('Image uploaded successfully, path:', response.imagePath);
      });
    }
  }
}
