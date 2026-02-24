# My Task Organizer

A sleek and modern task management application built with a Node.js/Express backend and a responsive jQuery frontend. This organizer allows users to efficiently track their daily tasks with priority levels and real-time updates.

## 🚀 Features

-   **Add Tasks**: Quickly add new tasks with specific priority levels (High, Medium, Low).
-   **Edit Tasks**: Modify pending tasks to keep your list up to date. (Editing is disabled for completed tasks).
-   **Delete Tasks**: Remove tasks you no longer need.
-   **Task Completion**: Mark tasks as completed with a single click.
-   **Priority Indicators**: Visual dots represent the priority of each task.
-   **Filtering**: Easily view All, Pending, or Completed tasks.
-   **Natural Order**: Tasks are displayed in the order they were added (newest at the top).

## 🛠️ Technologies Used

-   **Frontend**: HTML5, Vanilla CSS, JavaScript (jQuery)
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Environment**: dotenv for configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v14 or later)
-   A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## ⚙️ Installation

1.  **Clone the project** or download the files.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_uri
    ```

## 🏃 Running the Application

Start the server using Node:

```bash
node server.js
```

The application will be available at: **http://localhost:5000**

## 📂 Project Structure

-   `server.js`: Main entry point and server configuration.
-   `models/`: Database schemas (MongoDB/Mongoose).
-   `routes/`: API endpoint definitions.
-   `public/`: Frontend assets (HTML, CSS, JS).
-   `.env`: Environment configuration (private).
