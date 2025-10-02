# TODO App – Real-Time Collaborative Task Manager

## Overview
A full-stack, real-time collaborative TODO application with:  
- **Multi-user authentication**  
- **Team creation and management**  
- **Task assignment and status updates**  
- **Real-time updates** using WebSockets (Django Channels)  
- **Responsive UI** built with React & MUI  

This project demonstrates a complete workflow from **backend API** to **frontend interface** with collaborative features.

---

## Tech Stack
- **Frontend:** React (Vite), MUI  
- **Backend:** Django, Django REST Framework, Django Channels  
- **Database:** SQLite (development) / PostgreSQL (production recommended)  
- **WebSocket:** Django Channels + Redis  
- **Deployment:** Vercel (frontend) + Railway / Heroku (backend)  

---

## Features
1. **User Authentication**
   - Register, login, logout
   - Token-based authentication
2. **Team Management**
   - Create teams
   - Add members to teams
   - Manager can assign tasks to members
3. **Task Management**
   - Create tasks with title, description, priority, status, due date
   - Assign tasks to team members
   - Status update (To Do → In Progress → Done)
4. **Real-Time Collaboration**
   - Tasks updated by any user appear instantly for all team members
   - Highlight animation for newly added or updated tasks
5. **Responsive UI**
   - Works on mobile and desktop
   - Clean, modern design using MUI

---

## Setup (Development)

### Backend
1. Clone the repository
   ```bash
   git clone https://github.com/Tavishi-Maini/todo-app.git
   cd todo-app/backend
2. Create virtual environment and install dependencies
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Linux/Mac
   .venv\Scripts\activate     # Windows
   pip install -r requirements.txt
3. Apply migrations
   ```bash
   python manage.py migrate
4. Start Redis (required for WebSockets)
   ```bash
   redis-server
5. Run the server
   ```bash
   python manage.py runserver

### Frontend
1. Navigate to frontend folder
    ```bash
    cd ../frontend
2. Install dependencies
    ```bash
    npm install
3. Start development server
    ```bash
    npm run dev
4. Open in browser
    ```bash
    http://localhost:5173

## Deployment

### Backend
- Deploy using Railway / Heroku
- Add Redis add-on for Django Channels
- Set environment variables: SECRET_KEY, DEBUG=False, ALLOWED_HOSTS

### Frontend
- Deploy using Vercel or Netlify
- Update API URLs in lib/api.js to your production backend
- Build and deploy
    ```bash
    npm run build