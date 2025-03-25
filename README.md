# CodeSage - Task Management API

## Overview
CodeSage is a simple Task Management API built using **Express.js** and **TypeScript**. It allows users to create, read, update, and delete tasks via a REST API.

## Features
- RESTful API for managing tasks
- CRUD operations for tasks (Create, Read, Update, Delete)
- Hot Module Replacement (HMR) with Vite
- TypeScript support

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/CodeSage.git
   cd CodeSage
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## Requirements
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **tsx** (for TypeScript execution, installed via dependencies)

## API Endpoints

### Get all tasks
```http
GET /api/tasks
```
#### Response:
```json
[] // Empty array if no tasks exist
```

### Create a new task
```http
POST /api/tasks
```
#### Request Body:
```json
{
  "title": "Sample Task",
  "description": "Task details"
}
```
#### Response:
```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "Task details"
}
```

### Update a task
```http
PUT /api/tasks/:id
```
#### Response:
```json
{
  "message": "Task updated successfully"
}
```

### Delete a task
```http
DELETE /api/tasks/:id
```
#### Response:
```json
{
  "message": "Task deleted successfully"
}
```

## Troubleshooting
If you encounter the error:
```
'tsx' is not recognized as an internal or external command
```
Try reinstalling dependencies:
```sh
npm install
```

If vulnerabilities are found, you can fix them with:
```sh
npm audit fix
npm audit fix --force # If necessary
```

## License
This project is licensed under the MIT License.

