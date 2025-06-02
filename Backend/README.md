# README.md - User Registration API

## Endpoint: POST `/user/register`

### Description
This endpoint allows new users to register an account in the system. It validates the user input, hashes the password for security, creates a new user record in the database, and returns an authentication token along with the user details.

### Request Method
`POST`

### Request Headers
```
Content-Type: application/json
```

### Request Body
The request body must be a JSON object containing the following fields:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `email` | string | Yes | Must be a valid email format, minimum 5 characters | User's email address (must be unique) |
| `fullname.firstname` | string | Yes | Minimum 3 characters | User's first name |
| `fullname.lastname` | string | No | Minimum 3 characters (if provided) | User's last name |
| `password` | string | Yes | Minimum 6 characters | User's password (will be hashed before storage) |

### Request Body Example
```json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "mySecurePassword123"
}
```

### Response Format

#### Success Response (Status Code: 201)
When registration is successful, the endpoint returns:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY5YTFiMzRkNzg5YTIzNGY1Njc4OTAiLCJpYXQiOjE2NzE2MzIwMDB9.example_jwt_token_signature",
  "user": {
    "_id": "65f9a1b34d789a234f567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

#### Error Response (Status Code: 400)
When validation fails, the endpoint returns:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be atleast 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "password must be atleast 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| `201` | **Created** - User successfully registered |
| `400` | **Bad Request** - Validation errors or missing required fields |
| `500` | **Internal Server Error** - Database connection issues or server errors |

### Authentication
After successful registration, the response includes a JWT token that can be used for authenticating subsequent requests. Store this token securely on the client side.

### Security Features
- Passwords are automatically hashed using bcrypt with a salt round of 10
- Email addresses must be unique across the system
- JWT tokens are generated for immediate authentication
- Input validation prevents malicious data entry

### Usage Example

#### cURL Request
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "password": "securePassword456"
  }'
```

#### JavaScript (Fetch API)
```javascript
const response = await fetch('/user/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'jane.smith@example.com',
    fullname: {
      firstname: 'Jane',
      lastname: 'Smith'
    },
    password: 'securePassword456'
  })
});

const data = await response.json();

if (response.ok) {
  // Registration successful
  console.log('Token:', data.token);
  console.log('User:', data.user);
} else {
  // Handle validation errors
  console.error('Errors:', data.errors);
}
```

### Notes
- The `lastname` field is optional but must meet minimum length requirements if provided
- Email validation ensures proper email format
- The password is never returned in responses for security reasons
- The generated JWT token contains the user's ID and can be decoded to verify user identity
- All database operations are asynchronous and properly handled with error management