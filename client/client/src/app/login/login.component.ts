import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';                      
  password = '';                         
  newUsername = '';                 
  newPassword = '';                
  loginErrorMessage = '';           
  registrationErrorMessage = '';    
  successMessage = '';              
  showRegistration = false;        

  constructor(private router: Router, private socketService: SocketService) {}

  login() {
    if (!this.username.trim() || !this.password.trim()) {      
      this.loginErrorMessage = 'Please enter both username and password.';
      return;
    }

    // Send login request to the backend
    this.socketService.authenticateUser(this.username, this.password).subscribe(
      response => {
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/chat']);  // Redirect to chat on successful login
      },
      error => {
        this.loginErrorMessage = 'Invalid credentials, please try again.';
      }
    );
  }

  register() {
    if (!this.newUsername.trim() || !this.newPassword.trim()) {
      this.registrationErrorMessage = 'Please enter both a username and password.';
      return;
    }

    this.socketService.registerUser({ username: this.newUsername, password: this.newPassword }).subscribe(
      response => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.clearRegistrationForm();
      },
      error => {
        this.registrationErrorMessage = 'Registration failed. Try again.';
      }
    );
  }

  toggleRegistration() {
    this.showRegistration = !this.showRegistration;
    this.clearMessages();
  }

  private clearRegistrationForm() {
    this.newUsername = '';
    this.newPassword = '';
    this.showRegistration = false;
  }

  private clearMessages() {
    this.successMessage = '';
    this.loginErrorMessage = '';
    this.registrationErrorMessage = '';
  }
}
