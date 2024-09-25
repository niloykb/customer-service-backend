# Customer Service Backend

This is a backend API service named `customer-service-backend` built using TypeScript, Prisma ORM, and JSON Web Tokens (JWT) for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/customer-service-backend.git
    cd customer-service-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the database using Prisma:

    ```bash
    npx prisma migrate dev --name init
    ```

4. Generate Prisma client:

    ```bash
    npx prisma generate
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

### Customers

- **GET /customers**: Retrieve a list of customers.
- **GET /customers/:id**: Retrieve a specific customer by ID.
- **POST /customers**: Create a new customer.
- **PUT /customers/:id**: Update a customer by ID.
- **DELETE /customers/:id**: Delete a customer by ID.

## Authentication

This project uses JWT for authentication. To access protected routes, include the JWT token in the `Authorization` header as follows:

```http
Authorization: Bearer <your-token>
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
