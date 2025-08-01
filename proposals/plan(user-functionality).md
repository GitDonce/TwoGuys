# Registration and Login Feature Implementation Plan

This document outlines the plan to add a registration and login feature to the application.

## Backend Implementation Plan

### 1. Data Structure Changes

We will not be using a database. Instead, we will use JSON files in the `backend/data` folder to store data.

*   **users.json:** A new `users.json` file will be created to store user data. Each user object will have:
    *   `id`: Unique ID
    *   `email`: String, unique
    *   `password`: String (will be stored as a hash)
*   **cities.json:** The existing `cities.json` file will be modified. Each city object will be updated to include a `userId` field, linking it to a user in `users.json`.

### 2. API Endpoint Definitions

The following new API endpoints will be created:

*   **Authentication:**
    *   `POST /api/auth/register`: For user registration.
    *   `POST /api/auth/login`: For user login.
    *   `POST /api/auth/logout`: For user logout.
*   **User-specific Cities:**
    *   `GET /api/user/cities`: To get all cities for the currently logged-in user.

The existing city-related endpoints will be updated to handle user ownership:

*   `POST /api/cities`: Will now associate the created city with the logged-in user.
*   `PUT /api/cities/:id`: Will check if the logged-in user is the owner of the city before updating.
*   `DELETE /api/cities/:id`: Will check if the logged-in user is the owner of the city before deleting.

### 3. Authentication Strategy

*   We will use JSON Web Tokens (JWT) for authentication.
*   Upon successful login, a JWT will be generated and sent to the client.
*   The client will include the JWT in the `Authorization` header for all protected API requests.

### 4. Data Updates

No migration script is needed. The JSON data files in `backend/data` will be updated directly to:

1.  Create an admin user with the email `admin@admin.com` and password `pwd123`.
2.  Update all existing cities in `cities.json` to be owned by the new admin user.
A backup of the original data files will be made before editing.

## Frontend Implementation Plan

### 1. New Components and Pages

*   **Registration Page:** A new page with a form for users to enter their email and password.
*   **Login Page:** A new page with a form for users to log in.
*   **User/Dashboard Page (`/user`):** We will use the existing page at `http://localhost:8080/user`.
    *   The "My Cities" section will display the cities that belong to the currently logged-in user.
    *   The "Profile" section will show the logged-in user's details.
    *   The "Add City" button will be kept.
*   **Navbar Updates:** The main navigation bar will be updated to show:
    *   "Login" and "Register" links for logged-out users.
    *   "My Dashboard" and "Logout" links for logged-in users.

### 2. Routing Changes

*   New routes will be added for `/register` and `/login`.
*   The `/user` route will be protected, meaning it will only be accessible to logged-in users, and will serve as the user dashboard.

### 3. State Management

*   A global state management solution (e.g., React Context) will be used to manage the user's authentication state throughout the application.

### 4. API Integration

*   The frontend will be updated to communicate with the new backend API endpoints for registration, login, and fetching user-specific data.

## Suggested Improvements

Here are some suggested improvements that can be implemented after the core features are in place:

*   **Password Strength:** Enforce password strength requirements on the registration page.
*   **Email Confirmation:** Send a confirmation email to the user upon registration.
*   **Forgot Password:** Implement a "forgot password" feature.
*   **Role-Based Access Control:** Introduce user roles (e.g., "admin", "user") to manage permissions more effectively.
*   **Enhanced Error Handling:** Provide more specific and user-friendly error messages on both the frontend and backend.
