# Stan
A simple RESTful authentication and authorization service.

/auth_service/login (POST)
```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}
```
Returns 200 OK and 
```json
{ 
  "message": "Authentication Successful!",
  "key": "AUTH_KEY" 
}
```
on success, 401 UNAUTHORIZED on failure.

/auth_service/users/:id (GET)
Returns 200 OK with
```json
{
  "username": "USERNAME",
  "email": "EMAIL",
  "services": [...],
  "url": "/auth_service/users/UID"
}
```
on success.

/auth_service/users (POST)
```json
{
  "username": "USERNAME",
  "password": "PASSWORD",
  "email": "EMAIL",
  "services": [ { "service": "SERVICE_ID" } ]
}
```
Returns 200 OK with
```json
{
  "username": "USERNAME",
  "email": "EMAIL",
  "services": [...],
  "url": "/auth_service/users/UID"
}
```
on success.

/auth_service/users/:id (PUT)
