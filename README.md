# Fullstack App: User Management and Posts  

This project is a fullstack web application with a focus on user and post management. It features a robust backend built with Express.js and a dynamic frontend powered by React and TypeScript.

---

## Features  

### Backend  
- **Tech Stack**: Express.js with Node.js and zod for validation.  
- **User Endpoints**:  
  - Extended user-related endpoints to include user addresses.  
  - Retrieves and formats addresses from the database.  
  - Validates addresses before returning them to the frontend.  
- **Post Endpoints**:  
  - Create a new post by accepting `Title`, `Body`, and `User ID`.  
  - Delete a post by its `ID`.  
- **Database Integration**: Efficient querying and data formatting for seamless integration with the frontend.

---

### Frontend  
- **Tech Stack**: TypeScript, React, React Query, Tailwind CSS.  
- **Dynamic UI**:  
  - Responsive user interface with reusable components and centralized state management.  
  - Pages and components handle loading and error states gracefully.  
- **Features**:  
  - Fetches a list of users and their posts from the backend API.  
  - Pagination for user lists with dynamic querying for scalability.  
  - A reusable table component for displaying user data with extensibility for other datasets.  

---

## Setup Instructions  

### Backend  
1. Install dependencies:  
   ```bash
   cd backend
   npm install
2. Start the server:
   ```bash
   npm run dev

### Frontend
1. Install dependencies
   ```bash
   cd frontend
   yarn install
2. Start the server:
   ```bash
   yarn dev

### API Endpoints
#### User Endpoints
* GET /users: Retrieve a list of users, including addresses.
* POST /posts: Create a new post (requires title, body, and user_id).
* DELETE /posts/:id: Delete a post by its ID.
#### Frontend Pages
* Users List (/users): Displays paginated user data with addresses.
* User Posts(/users/posts/:id): View and manage posts for individual users.

 #### Future Enhancements
* Add authentication and authorization.
* Implement advanced filtering and sorting for user and post lists.
* Extend the frontend to support post editing.
