# Stan
A simple RESTful authentication and authorization service.

* /auth_service/login (POST)
* Request body must contain:
```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}
```
* On success, responds 200 OK with body: 
```json
{ 
  "message": "Authentication Successful!",
  "key": "AUTH_KEY" 
}
```
* On failure, responds 401 UNAUTHORIZED.


* /auth_service/users/:id (GET)
* On success, responds 200 OK with body:
```json
{
  "username": "USERNAME",
  "email": "EMAIL",
  "services": [ 
    { "service": "SERVICE_ID1" },
    { "service": "SERVICE_ID2" }
  ],
  "url": "/auth_service/users/UID"
}
```


* /auth_service/users (POST)
* Request body must contain:
```json
{
  "username": "USERNAME",
  "password": "PASSWORD",
  "email": "EMAIL",
  "services": [ 
    { "service": "SERVICE_ID1" },
    { "service": "SERVICE_ID2" }
  ]
}
```
* On success, responds 200 OK with body:
```json
{
  "username": "USERNAME",
  "email": "EMAIL",
  "services": [ 
    { "service": "SERVICE_ID1" },
    { "service": "SERVICE_ID2" }
  ],
  "url": "/auth_service/users/UID"
}
```


* /auth_service/users/:id (PUT)
* Request body must contain a non-empty subset of fields in the POST request body.
* On success, responds 200 OK with body:
```json
{
  "username": "USERNAME",
  "email": "EMAIL",
  "services": [ 
    { "service": "SERVICE_ID1" },
    { "service": "SERVICE_ID2" }
  ],
  "url": "/auth_service/users/UID"
}
```
