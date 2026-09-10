
### Technologies Used

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication
- SQLite

### Frontend
- React
- Vite
- React Router
- Axios

## Project Structure

```text
blog management system/
├── backend/
├── blog/
├── frontend/
├── db.sqlite3
├── manage.py
├── requirements.txt
└── README.md

Backend

Create and activate virtual environment:

python -m venv .venv
.venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run migrations:

python manage.py migrate

Start Django server:

python manage.py runserver

Backend runs at:

http://127.0.0.1:8000/

Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open the URL shown by Vite, usually:

http://localhost:5174/



Authentication

The project uses JWT authentication for user login and protected operations.

Database

The project uses SQLite database.

Main models:

User
Blog
Category
Comment

A Blog belongs to a User and can have a Category and multiple Comments.

Admin

Django admin can be accessed at:

http://127.0.0.1:8000/admin/

Create an admin user using:

python manage.py createsuperuser