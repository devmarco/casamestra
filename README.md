# API CASAMESTRA

## Endpoints

### Estates [estates]

##### /estates

	[GET] - Returns all estates
	[POST] - Create a new estate

##### /estates/{ID}

	[GET] - Returns the estate that have this ID
	[PUT] - Update the estate that have this ID
	[DELETE] - Delete the estate that have this ID

##### /estates/buy

	[GET] - Returns all estates to buy

##### /estates/rent

	[GET] - Returns all estates to rent

##### /estates/new

	[GET] - Returns estates in construction phase


### Agents [agents]

##### /agents

	[GET] - Returns all agents
	[POST] - Create a new agent

##### /agents/{ID}

	[PUT] - Update the agent that have this ID
	[DELETE] - Delete the agent that have this ID

### Neighborhoods [neighborhoods]

##### /neighborhoods

	[GET] - Returns all neighborhoods
	[POST] - Create a new neighborhood

##### /neighborhoods/{ID}

	[PUT] - Update the neighborhood that have this ID
	[DELETE] - Delete the neighborhood that have this ID

### Users [users]

##### /users

	[GET] - Returns all users
	[POST] - Create a new user

##### /users/{ID}

	[PUT] - Update the user that have this ID
	[DELETE] - Delete the user that have this ID

### Favorites [favorites]

##### /estates/favorites

	[GET] - Returns all favorited estates

##### /estates/favorites/{USERID}

	[GET] - Rerturns favorites associated with one user

##### /estates/{ESTATEID}/favorites/users

	[GET] - Rerturns all users that favorited this estate

##### /estates/{ESTATEID}/favorites/{USERID}

	[POST] - Create a favorite estate where is associate with one user
	[DELETE] - Delete the favorite estate wich is associated with one user