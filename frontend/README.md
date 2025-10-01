# TODO App

A full-stack TODO application with:
- Secure multi-user authentication (JWT)
- Responsive UI with MUI
- Advanced task management (priority, due dates, status)
- Team collaboration features

## Tech Stack
- Frontend: React (Vite) + MUI
- Backend: Django REST Framework + JWT
- Database: PostgreSQL (SQLite in dev)

## Setup Instructions
### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
