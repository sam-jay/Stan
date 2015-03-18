# Stan
A simple RESTful authentication and authorization service.

----
##### /auth_service/users/:id (GET)
On success, responds 200 with body: 
```json
{ 
  "user": "username",
  "email": "email",
  "groups": [ "group" ],
  "url": "/auth_service/users/xxxx"
}
```
On failure, responds 404.

----
##### /auth_service/users (POST)
Request body must contain:
```json
{
  "user": "username",
  "email": "email",
  "pw": "password",
  "groups": [ "group_url" ]
}
```
On success, responds 201 with same body as GET.
On failure, responds 400.

----
##### /auth_service/users/:id (PUT)
Request body must be a subset of the POST body.
On success, responds 200 with same body as GET.
On failure, responds 404 if not found, otherwise 400.

----
##### /auth_service/users/:id (DELETE)
On success, responds 204.
On failure, responds 404.

----
##### /auth_service/groups/:id (GET)
On success, responds 200 with body:
```json
{
  "name": "groupname",
  "resources": [ "resource" ],
  "users": [ "user" ],
  "url": "/auth_service/groups/xxxx"
}
```

----
##### /auth_service/groups (POST)
Request body must contain:
```json
{
  "name": "groupname",
  "resources": [ "resource_url" ],
  "users": [ "user_url" ]
}
```
On success, responds 201 with same body as GET.
On failure, responds 400.

----
##### /auth_service/groups/:id (PUT)
Request body must be a subset of the POST body.
On success, responds 200 with same body as GET.
On failure, responds 404 if not found, otherwise 400.

----
##### /auth_service/groups/:id (DELETE)
On success, responds 204.
On failure, responds 404.

----
##### /auth_service/resources/:id (GET)
On success, responds 200 with body: 
```json
{ 
  "prefix": "resource_prefix",
  "token": "access_token",
  "url": "/auth_service/resources/xxxx"
}
```
On failure, responds 404.

----
##### /auth_service/resources (POST)
Request body must contain:
```json
{
  "prefix": "resource_prefix",
  "token": "access_token"
}
```
On success, responds 201 with same body as GET.
On failure, responds 400.

----
##### /auth_service/resources/:id (PUT)
Request body must be a subset of the POST body.
On success, responds 200 with same body as GET.
On failure, responds 404 if not found, otherwise 400.

----
##### /auth_service/resources/:id (DELETE)
On success, responds 204.
On failure, responds 404.

----
##### /auth_service/tokens (GET)
Authentication header must contain:
Basic auth_string where auth_string is username:password in Base64 form.
On success, responds 200 with body:
```json
{
  "tokens": [ "access_token" ]
}
```
On failure, responds 401.
