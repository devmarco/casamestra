# Casa Mestra API

## Overview

This is the oficial Private API for Casa Mestra

Here you can understand better how the API works, and how you can access the endpoints

- [Features](#features)
- [Users](#users)
- [Agents](#agents)
- [Estates](#estates)
- [Neighborhoods](#neighborhoods)
- [Favorites](#favorites)

## Features

- [x] Error Handlings
- [x] Logging
- [x] Validation
- [x] Testing
- [ ] Authentication & Authorization
- [ ] Hypermedia
- [ ] Alert System
- [ ] Apointmments
- [ ] Recommendations

## Users

Users live under **users/**

Field | Description
------|------------
firstName | The first name of User
lastName | The last name of User
email | The email of User
phones.cellphone | The cellphone numnber of User
phones.homephone | The office/home number of User
password | The password of User

#### Endpoints

Endpoints | Method | Description
----------|-------|-----
/users | GET | Get all users
/users | POST | Create an user
/users/{UCMID} | GET | Get a single user by ID
/users/{UCMID} | DELETE | Delete an user
/users/{UCMID} | PUT/PATCH | Update an user
