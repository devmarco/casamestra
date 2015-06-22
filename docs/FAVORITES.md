# Casa Mestra API

## Favorites

Favorites live under **favorites/**

#### Endpoints

Endpoints | Method | Description
----------|-------|-----
/favorites | GET | Get all favorited estates
/favorites | POST | Favorite an estate
/favorites/{UCMID} | GET | Get all favorites of a specific user
/favorites/users/{ECMID} | GET | Get all users that has favorited a specific estate
/favorites* | DELETE | Remove a favorite

* This endpoint has some payload parameters