# Full Stack Task Manager

This project is a beginner-friendly internship-style task manager built with Java Spring Boot, React, Vite, and MySQL.

## Folder structure

- `task-manager-backend/`
  - `pom.xml`
  - `src/main/java/com/example/taskmanager/`
    - `TaskManagerApplication.java`
    - `controller/TaskController.java`
    - `entity/Task.java`
    - `exception/GlobalExceptionHandler.java`
    - `exception/ResourceNotFoundException.java`
    - `repository/TaskRepository.java`
    - `service/TaskService.java`
    - `service/TaskServiceImpl.java`
  - `src/main/resources/application.properties`
- `task-manager-frontend/`
  - `package.json`
  - `vite.config.js`
  - `index.html`
  - `src/main.jsx`
  - `src/App.jsx`
  - `src/index.css`
- `task_manager_db.sql`

## MySQL setup

Run the following SQL in MySQL to create the database and user:

```sql
CREATE DATABASE IF NOT EXISTS task_manager_db;
CREATE USER IF NOT EXISTS 'task_user'@'localhost' IDENTIFIED BY 'task_password';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'task_user'@'localhost';
FLUSH PRIVILEGES;
```

## Run the backend

1. Make sure MySQL is running.
2. Open a terminal and go to the backend folder.
3. Run:

```bash
cd task-manager-backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`.

## Run the frontend

1. Open a second terminal and go to the frontend folder.
2. Run:

```bash
cd task-manager-frontend
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`.

## Postman testing examples

### Create task

- Method: `POST`
- URL: `http://localhost:8080/api/tasks`
- Body:

```json
{
  "title": "Finish resume draft",
  "description": "Write the final summary for the internship project.",
  "status": "TODO"
}
```

### Get all tasks

- Method: `GET`
- URL: `http://localhost:8080/api/tasks`

### Get task by ID

- Method: `GET`
- URL: `http://localhost:8080/api/tasks/1`

### Update task

- Method: `PUT`
- URL: `http://localhost:8080/api/tasks/1`
- Body:

```json
{
  "title": "Finish resume draft",
  "description": "Write the final summary and update the checklist.",
  "status": "IN_PROGRESS"
}
```

### Delete task

- Method: `DELETE`
- URL: `http://localhost:8080/api/tasks/1`

## Notes

- The frontend uses Axios and a simple Bootstrap look.
- The backend is organized into controller, service, repository, and entity layers.
- The app is kept simple on purpose so it is easy to read and learn from.
