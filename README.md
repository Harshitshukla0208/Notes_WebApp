# Notes WebApp README

Welcome to the Notes WebApp! This simple yet powerful application allows you to create, update, delete, and search notes effortlessly. The application is built using Node.js for the backend, EJS templating for the views, Passport.js for user authentication, and MongoDB Atlas for the database.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [Dependencies](#dependencies)
7. [Contributing](#contributing)
8. [License](#license)

## Getting Started

To run the Notes WebApp on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Harshitshukla0208/Notes_webApp
   ```

2. Install dependencies:

   ```bash
   cd notes-webapp
   npm install
   ```

3. Set up your database. Create a MongoDB Atlas account and configure your connection URI in the `config.js` file.

4. Configure your secret keys for Passport.js in the `config.js` file.

5. Run the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Notes WebApp.

## Features

### 1. User Authentication

- **Signup:** Users can create accounts by providing a username and password.
- **Login:** Existing users can log in using their credentials.
- **Logout:** Users can securely log out to protect their accounts.

### 2. Note Management

- **Create Note:** Users can add new notes with a title and content.
- **Update Note:** Users can edit the title or content of an existing note.
- **Delete Note:** Users can remove unwanted notes from their collection.

### 3. Search Functionality

- **Search Notes:** Users can search for specific notes using keywords or phrases.

## Installation

Make sure you have Node.js and npm installed on your machine. Follow the [official Node.js installation guide](https://nodejs.org/) if you haven't installed them yet.

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

3. Sign up for a new account or log in with existing credentials.

4. Manage your notes using the provided features.

## File Structure

The project's file structure is organized as follows:

```
notes-webapp/
|-- config/
|   |-- config.js
|-- models/
|   |-- user.js
|   |-- note.js
|-- public/
|   |-- styles/
|       |-- style.css
|-- routes/
|   |-- index.js
|   |-- users.js
|   |-- notes.js
|-- views/
|   |-- partials/
|       |-- header.ejs
|       |-- footer.ejs
|   |-- index.ejs
|   |-- login.ejs
|   |-- signup.ejs
|   |-- notes.ejs
|   |-- error.ejs
|-- index.js
|-- package.json
|-- README.md
```

## Dependencies

The Notes WebApp relies on the following key dependencies:

- `express`: Web application framework for Node.js
- `ejs`: Embedded JavaScript templates for rendering views
- `mongoose`: MongoDB object modeling tool for Node.js
- `passport`: Authentication middleware for Node.js
- `passport-local`: Passport strategy for authenticating with a username and password
- `dotenv`: Loads environment variables from a `.env` file

For a complete list of dependencies, please refer to the `package.json` file.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Check out the [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.