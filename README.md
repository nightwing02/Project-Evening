# Login and Registration System with Node.js and MySQL

This project is a simple and secure Login and Registration System built using Node.js, JavaScript, and MySQL. It employs the EJS templating engine for views and the Nodemailer library for sending email notifications to users. This system provides a solid foundation for implementing user authentication and account management in your web applications.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Features

- **User Registration**: Allows users to create new accounts with a unique username and email.
- **User Authentication**: Implements secure password hashing for user authentication.
- **User Login**: Enables users to log in with their registered credentials.
- **Password Reset**: Provides an option for users to reset their passwords via email.
- **Email Notifications**: Sends email notifications to users for account creation, password reset, etc.
- **Session Management**: Maintains user sessions for a seamless browsing experience.
- **Customizable Views**: Uses EJS templates for easy customization of the user interface.

## Requirements

Before you get started, ensure you have the following software and dependencies installed:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed on your system.
- [MySQL](https://www.mysql.com/): Install and configure MySQL as the database for this project.

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/login-registration-nodejs-mysql.git
   ```

2. Navigate to the project directory:

   ```shell
   cd login-registration-nodejs-mysql
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

## Configuration

1. **Database Configuration**:

   - Create a MySQL database for this project.
   - Update the database connection details in `config/database.js` with your MySQL credentials.

2. **Email Configuration**:

   - Configure your email provider settings (e.g., Gmail, SMTP server) in `config/email.js`.
   - Make sure to enable "less secure apps" or generate an app password if using Gmail.

3. **Session Configuration**:

   - Adjust session configuration in `config/session.js` to suit your needs.

## Usage

1. Start the application:

   ```shell
   npm start
   ```

2. Open a web browser and navigate to `http://localhost:3000` to access the application.

3. Register a new account, log in, and explore the features of the system.

4. Customize the views in the `views/` directory to match your application's design.


---

Enjoy building secure user authentication and registration systems with Node.js, EJS, and MySQL! If you encounter any issues or have questions, please contact at avabhinav12@gmail.com.
