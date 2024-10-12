// src/app/services/image-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private uploadUrl = 'http://localhost:3000/api/upload-image'; // adjust your endpoint as needed
 

  constructor(private http: HttpClient) {}

  // Upload an image file
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.uploadUrl, formData);
  }
}
