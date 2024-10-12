# Chat Application (Phase 2) - Assignment 3813ICT

# Documentation

### 1. **Git Repository Organization and Development Process**

   - **Branching Strategy**:
     The repository follows a branching strategy, with branches for development (`dev`), main features, and a stable `main` branch. Key branches include:
     - **Main**: Stable codebase, updated after testing.
     - **Feature branches**: Separate branches for adding major features such as chat, video, or authentication.

   - **Commit Practices**:
     Commits are made frequently, following a structure such as `feature`, `fix`, or `refactor`. This practice keeps a history of development steps, which is useful for bug tracking and rollbacks if needed.

   - **Structure**:
     - **Client** (`client/`): Contains the Angular project files, with individual folders for components, services, and models.
     - **Server** (`server/`): Contains the Node.js/Express backend code, including controllers, routes, and database models.

---

### 2. **Data Structures in Client and Server**

   - **Client-Side Structures (Angular)**:
     - **User**: Stores user data including `username`, `password`, and user roles.
     - **Channel**: Represents a chat channel with attributes `id`, `name`, and `participants`.
     - **Message**: Used to represent a chat message, including `user`, `text`, and `timestamp`.
   
   - **Server-Side Structures (Node.js/Express)**:
     - **User Schema**: MongoDB model with fields `username`, `hashedPassword`, `role`, and `channels`.
     - **Channel Schema**: Represents each chat channel with fields like `name`, `users`, and `messages`.
     - **Message Schema**: Stores each message’s details, including `user`, `content`, `timestamp`, and optional image URLs.

---

### 3. **Division of Responsibilities between Client and Server**

   - **Client (Angular)**:
     - **UI and Interaction**: Manages the user interface, including forms for login and chat, and displays for real-time messaging and video calling.
     - **Routing**: Controls navigation between components (`/login`, `/chat`, `/video`).
     - **Data Processing**: Sends data to the server for processing, including messages and image uploads.
     - **Real-Time Events**: Listens for events from the server, such as new messages or user status updates, using Socket.IO.

   - **Server (Node.js/Express)**:
     - **Data Storage**: Manages MongoDB storage of users, channels, and messages.
     - **REST API**: Exposes endpoints for image uploads and other data transactions.
     - **Real-Time Communication**: Manages Socket.IO events, handling chat messages, video call initiation, and user connections.

---

### 4. **List of Routes and API Endpoints**

   - **User Authentication**:
     - `POST /api/users/register`: Registers a new user with username, password, and email.
     - `POST /api/users/login`: Authenticates a user based on provided credentials.

   - **Chat and Messaging**:
     - `POST /api/chat/send-message`: Sends a message to a specified channel.
     - `GET /api/chat/history`: Retrieves message history for a specific channel.

   - **Image Upload**:
     - `POST /api/upload-image`: Handles image uploads and returns the file URL.

   - **Parameters**: Each endpoint includes necessary parameters (like `channelId`, `userId`, etc.) and returns either success or error messages along with data.
   
---

### 5. **Angular Architecture**

   - **Components**:
     - **ProfileComponent**: Manages login and registration views.
     - **ChatComponent**: Displays chat interface, including channel selection and message display.
     - **VideoComponent**: Handles peer-to-peer video calls.
   
   - **Services**:
     - **AuthService**: Manages authentication requests (login, registration).
     - **SocketService**: Handles real-time messaging and video events with Socket.IO.
     - **ImageUploadService**: Manages image uploads to the server.

   - **Models**:
     - **User**: Defines the user structure for frontend interactions.
     - **Message**: Represents chat messages with sender, content, and channel details.

   - **Routes**:
     - Angular routing configured to handle navigation between `/profile`, `/chat`, and `/video` components.

---

### 6. **Client-Server Interaction and Component Updates**

   - **Client-Side Updates**:
     - **Login/Register**: On a successful login, the `AuthService` updates the UI by navigating to `/chat`.
     - **Real-Time Chat**: `SocketService` listens for incoming messages, updating `ChatComponent` by appending messages to the chat window in real time.
     - **Video Calls**: `VideoComponent` listens for `startCall` and `endCall` events from `SocketService` and updates video feeds based on user actions.

   - **Server-Side Data Management**:
     - **User Data**: When a user registers, data is stored in the `User` collection, and sessions are managed upon login.
     - **Message Data**: Each message sent in `ChatComponent` is stored in the `Message` collection, and new messages are broadcasted to active channel participants.
     - **Channel Updates**: When a user joins or leaves a channel, the active user list in each channel is updated and broadcasted to clients in the same channel.

---

This documentation structure will help you cover each aspect in detail, aligning with both the technical requirements and the functionality specifics of your project.


## Git Repository Structure and Usage

This Git repository is organized to maintain a clean and modular structure across the project’s development process.

### Branches:
- **`main`**: The stable branch that houses the latest tested version of the app. Final code updates are merged into this branch after testing.

### Commit Frequency:
- Commits are made frequently, often after completing each piece of functionality or fixing bugs.
- Clear, descriptive commit messages like `"Added user authentication"` or `"Fixed duplicate messages issue"` aid in project tracking.

### Repository Structure:
- **Frontend (Angular)**: Located in `src/app/`. Each Angular component and service has its own folder, promoting modularity.
- **Backend (Node.js/Express)**: Located in the `server/` directory, with core files such as:
  - `server.js`: Initializes the server, configures routes, and sets up middleware.
  - Socket.IO integration is handled here for live chat functionality.
  - **Note**: Image upload handling is integrated but requires further configuration.

---

## Data Models and Structures

### User Model:
Defines a user’s information in the system.
- **`username`**: The unique identifier.
- **`password`**: Stored as a secure hash.
- **`role`**: Can be `User`, `GroupAdmin`, or `SuperAdmin`.

### Group Model:
Defines groups containing users and channels.
- **`id`**: Unique identifier for each group.
- **`name`**: Descriptive name of the group.
- **`channels`**: Array of channels within the group.
- **`users`**: Array of users belonging to the group.

### Channel Model:
Defines a communication channel.
- **`name`**: Name of the channel.
- **`users`**: Array of users in the channel.

### Message Model:
Defines messages within a channel.
- **`user`**: The sender of the message.
- **`message`**: The message content.
- **`imageUrl`**: URL of any attached image.
- **`timestamp`**: Date and time the message was sent.

---

## Angular Application Architecture

The Angular frontend follows a modular architecture, with distinct components, services, models, and routes.

### Components:
- **`ChatComponent`**: Manages live chat, channel joining, and message handling.
- **`LoginComponent`**: Manages user login and registration.

### Services:
- **`SocketService`**: Handles live communication with the server via Socket.IO.

### Models:
- **`User`**: Describes user properties such as username, role, and group affiliation.
- **`Group`**: Describes groups with fields for group ID, name, channels, and users.
- **`Channel`**: Describes channels with fields for channel name and associated users.

### Routes:
- **`/login`**: Route for user authentication.
- **`/chat`**: Route to the live chat interface.

---

## Node.js Server Architecture

The Node.js backend is structured for efficient management of server tasks, with clear separation of logic across files and modules.

### Core Files:
- **`server.js`**: Initializes the server, handles route setup, and configures Socket.IO for real-time updates.
- **`uploadRoutes.js`** and **`userRoutes.js`**: Handle image upload and user-related HTTP routes, respectively.

### Modules and Middleware:
- **`express`**: Manages HTTP requests and routing.
- **`socket.io`**: Provides real-time communication.
- **`mongodb`**: Manages database interactions, such as user, message, and group data.
- **`multer`**: Handles file uploads for image sharing (partially configured).

---

## Client-Server Interaction and Data Flow

### Client-Side (Angular):
- **UI Management**: Manages interface updates and user actions like message sending and channel joining.
- **Routing**: Defines navigation routes, such as `/login` and `/chat`.
- **Real-Time Data**: Listens for and updates the interface in response to Socket.IO events from the server.
- **Data Submission**: Sends user inputs, such as login credentials and messages, to the server.

### Server-Side (Node.js):
- **Data Persistence**: Stores persistent data in MongoDB, handling user, group, and channel data.
- **Socket.IO Events**: Manages events like `joinChannel`, `sendMessage`, and `disconnect`, broadcasting changes to active users.
- **REST API**: Provides HTTP endpoints, like for image uploads, that return relevant data to the client.

### Key Socket.IO Events:
- **`connection`**: Initializes a new user connection.
- **`joinChannel`**: Lets users join specific channels.
- **`sendMessage`**: Sends a message to a channel, broadcasting it to active users.
- **`disconnect`**: Cleans up user data when they leave the app.

---

## Deployment and Testing

The project is deployed locally for testing purposes. To run the project:

1. Clone the repository and navigate to the root.
2. Install dependencies with `npm install` in both the `client` and `server` directories.
3. Run the server and client apps using `npm start` in each directory.
4. Visit `http://localhost:4200` for the frontend and `http://localhost:3000` for the backend.

1. npm install mocha chai chai-http --save-dev
2. /api/upload-image
3. // tests/imageUpload.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // adjust path to your server file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Image Upload API', () => {
  it('should upload an image successfully', (done) => {
    chai.request(server)
      .post('/api/upload-image')
      .attach('image', 'tests/sample.jpg', 'sample.jpg') // attach an image for testing
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('imagePath');
        done();
      });
  });
});
4. npm test
