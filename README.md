# Employee Management Dashboard

## Project Overview

This project is a React-based Employee Management Dashboard built as part of an assignment.  
It provides a secure and user-friendly interface to manage employee records.

The application supports login, protected routing, employee CRUD operations, filtering, image upload with preview, and printing functionality.  
A mock backend is used to simulate real API behavior, so no real server is required.

---

## Features

- Login with protected dashboard access
- View employees in a table
- Add new employee
- Edit employee details
- Delete employee with confirmation modal
- Search employees by name
- Filter employees by gender and status
- Toggle employee status (Active / Inactive)
- Upload profile image with preview before save
- Print only the employee list
- Form validation for all required fields

---

## Tech Stack Used

### Frontend

- React (Vite)
- React Router DOM
- React Hooks (useState, useEffect, useContext, useMemo)
- Lucide React
- CSS (Normal CSS)

### Mock Backend

- MSW (Mock Service Worker)

### Tools

- Node.js
- npm

---

## Steps to Run the Project Locally

1. Clone the repository
   git clone <repository-url>

2. Go to project folder
   cd <project-folder>

3. Install dependencies
   npm install

4. Initialize MSW (run once)
   npx msw init public/

5. Start development server
   npm run dev

6. Open browser
   http://localhost:5173

7. Login using mock credentials
   Email: admin@assignment.com
   Password: password

8. Use dashboard to:
   - Add employee
   - Edit employee
   - Delete employee
   - Search and filter employees
   - Toggle Active/Inactive status
   - Print employee list
