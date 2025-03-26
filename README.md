# E-Commerce Backend

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install MongoDB:
   - Download MongoDB from the [official website](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your operating system.
   - Add the MongoDB `bin` directory to your system's PATH variable for easy access to the `mongod` command.
   - Start the MongoDB server by running:
     ```bash
     mongod
     ```

4. Install PostgreSQL:
   - Download PostgreSQL from the [official website](https://www.postgresql.org/download/).
   - Follow the installation instructions for your operating system.
   - Use pgAdmin for an easy-to-use graphical interface to manage your PostgreSQL database.

5. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     SQL_HOST=localhost
     SQL_USER=your_sql_user
     SQL_PASSWORD=your_sql_password
     SQL_DATABASE=ecommerce
     MONGO_URI=mongodb://localhost:27017/ecommerce
     PORT=5000
     JWT_SECRET=your_jwt_secret
     ```

6. Start the server:
   ```bash
   npm run dev
   ```

## Testing

Run tests using:
```bash
npm test
```

## Deployment

1. Use a platform like Heroku, AWS, or Azure for deployment.
2. Ensure environment variables are configured in the deployment environment.
3. Use `npm start` to start the server in production mode.
