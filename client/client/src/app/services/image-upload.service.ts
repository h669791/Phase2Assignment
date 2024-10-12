// src/app/services/image-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Upload an image file
  uploadProfileImage(file: File): Observable<{ imagePath: string }> {
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.http.post<{ imagePath: string }>(`${this.baseUrl}/upload-profile`, formData);
  }
}
