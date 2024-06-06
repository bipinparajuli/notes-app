## Description
This project is a Full Stack Notes Application built using Next.js, Node.js with Express, and Supabase. It provides CRUD operations to add, edit, read, and delete notes, as well as user registration and login functionality.

## Features
- User registration and login
- Create, read, update, and delete notes
- Secure authentication using JWT
- Responsive UI

## Technologies used
- **Frontend:** Next.js, React
- **Backend:** Node.js, Express
- **Database & Authentication:** Supabase
- **Styling:** Tailwind CSS

## Setup Instructions

### Prerequisites

    - Node.js (>= 14.x)
    - npm or yarn
    - Supabase account and project

### Backend setup
1. Clone the repository
   ```
      git clone https://github.com/bipinparajuli/notes-app.git
     cd notes-app/backend
     yarn
   ```
2. Configure environment variables
   Create a .env file in the backend directory with the following variables:
   ```
   DATABASE_URL=your_supabase_url
   DATABASE_KEY=your_supabase_key
   JWT_KEY=your_jwt_secret
   ```
3. Start backend application
   ```
   node index.js
   ```
## Frontend Setup
  1. Navigate to frontend directory
     ```
     cd frontend
     ```
  2. Install dependencies
     ```
     yarn
     ```
   3.  Configure environment variables
   Create a .env file in the frontend directory with the following variables:
   ```
     NEXT_PUBLIC_API="http://localhost:5000/api/"
   ```  
   4. Run the application
      ```
      yarn dev
      ``` 


