# Piso Platform

## Overview
Piso Platform is a web application that allows users to create, edit, and delete posts with authentication. The project is built using JavaScript, Axios, Bootstrap, and integrates with an API for user authentication and post management.

## Features
- **User Authentication**: Users can register, log in, and log out using API authentication.
- **Post Management**: Users can create, edit, and delete posts.
- **Infinite Scrolling**: Automatically loads more posts as the user scrolls.
- **User Profile Persistence**: User session is restored after page refresh.
- **Alerts and Notifications**: Provides feedback to users via alerts using SweetAlert.
- **Loading Indicator**: Shows a loader while API requests are processed.

## Technologies Used
- **JavaScript**: Core programming language for frontend functionality.
- **Axios**: For handling API requests.
- **Bootstrap**: For UI components and modal handling.
- **SweetAlert**: For improved alerts and user feedback.
- **LocalStorage**: To store user authentication tokens and session data.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/piso-platform.git
   ```
2. Navigate to the project folder:
   ```sh
   cd piso-platform
   ```
3. Open `index.html` in a browser to run the application.

## API Endpoints
The application interacts with the following API endpoints:
- **Login**: `POST https://tarmeezacademy.com/api/v1/login`
- **Register**: `POST https://tarmeezacademy.com/api/v1/register`
- **Create Post**: `POST https://tarmeezacademy.com/api/v1/posts`
- **Edit Post**: `PUT https://tarmeezacademy.com/api/v1/posts/{post_id}`
- **Delete Post**: `DELETE https://tarmeezacademy.com/api/v1/posts/{post_id}`

## How to Use
1. **Register/Login**:
   - Navigate to the login page and enter your credentials.
   - If you don't have an account, register with a username, password, and profile image.
2. **Create a Post**:
   - Click the "Add Post" button, enter a title and body, and submit.
3. **Edit a Post**:
   - Click the "Edit" button on an existing post to modify it.
4. **Delete a Post**:
   - Click the "Delete" button to remove a post permanently.
5. **Logout**:
   - Click the logout button to end your session.

## Contributing
If you want to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any inquiries, feel free to reach out via email: [hm528366@gmail.com](mailto:hm528366@gmail.com).

