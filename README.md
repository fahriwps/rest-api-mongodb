## Description

This project is a Transfer Management API using Node.js, Express.js, Typescript, and MongoDB.

## Usage

1. Clone the repository.


2. Navigate to the project directory and install required packages by running `npm install`.


3. Start the server with `npm run dev`.

## API Endpoint

| Name                                 | HTTP Method | Endpoint                                                                                             | Role             |
|--------------------------------------|-------------|------------------------------------------------------------------------------------------------------|------------------|
| **Base Endpoint**                    | `GET`       | [/](https://week-10-fahriwps-production.up.railway.app/)                                             | Public           |
| **List All Transfer Requests**       | `GET`       | [/transfer](https://week-10-fahriwps-production.up.railway.app/transfer)                             | Maker & Approver |
| **Register New User**                | `POST`      | [/auth/register](https://week-10-fahriwps-production.up.railway.app/auth/register)                   | Maker & Approver |
| **Login to Registered User**         | `POST`      | [/auth/login](https://week-10-fahriwps-production.up.railway.app/auth/login)                         | Maker & Approver |
| **Create Transfer Request**          | `POST`      | [/transfer](https://week-10-fahriwps-production.up.railway.app/auth/transfer)                        | Maker & Approver |
| **Update Transfer Request Status**   | `PATCH`     | [/transfer/:id](https://week-10-fahriwps-production.up.railway.app/transfer/64e7335c6a99a7837945d5e6) | Approver         |
| **Access Swagger API Documentation** | `GET` | [/api-docs](https://week-10-fahriwps-production.up.railway.app/api-docs/)| Public           |

## Example Request and Response for Each API Endpoint

This is the HTTP request method in JSON syntax for each API endpoint with their target endpoint and their privileged role.


- <b><u>POST METHOD</u></b>

<b>Target:</b> ```/auth/register```

<b>Role:</b> Maker and Approver

<b>REQUEST:</b>
```bash
{
  "username": "dummy",
  "password": "dummy123",
  "role": "maker" // or approver
}
```
<b>RESPONSE:</b>
```bash
{ 
  message: 'User registered successfully' 
}
```

- <b><u>POST METHOD</u></b>

<b>Target:</b> ```/auth/login```

<b>Role:</b> Maker and Approver

<b>REQUEST:</b>
```bash
{
  "username": "dummy",
  "password": "dummy123",
}
```

<b>RESPONSE:</b>
```bash
{ 
  message: 'Login successful', 
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU3MzJmNjZhOTlhNzgzNzk0NWQ1ZTMiLCJyb2xlIjoiYXBwcm9'
 }
```

- <b><u>POST METHOD</u></b>

<b>Target:</b> ```/transfer```

<b>Role:</b> Maker and Approver

<b>REQUEST:</b>
```bash
{
  "amount": 9999, // number type
  "currency": "USD", // string type
  "sourceAccount": "007007", // string type
  "destinationAccount": "808080" // string type
}
```

<b>RESPONSE:</b>
```bash
{ 
  message: 'Success created transfer request',
  data: { 
          acknowledge: 'true',
          insertedId: '64e7335c6a99a783794',
        }
}
```

- <b><u>PATCH METHOD</u></b>

<b>Target:</b> ```/transfer/:id```

<b>Role:</b> Approver

<b>REQUEST:</b>
```bash
{
  "status": "approved"
}
```

<b>RESPONSE:</b>
```bash
{ 
  message: 'Transfer request updated'
}
```

- <b><u>GET METHOD</u></b>

<b>Target:</b> ```/transfer```

<b>Role:</b> Maker and Approver

<b>RESPONSE:</b>
```bash
{
    data: [
        {
            _id: "64e7335c6a99a7837945d5e6",
            amount: 9999,
            currency: "USD",
            sourceAccount: "272727",
            destinationAccount: "787878",
            status: "pending",
            createdAt: "2023-08-24T10:39:24.298Z",
            updatedAt: "2023-08-24T11:13:48.287Z"
        }
    ]
}
```