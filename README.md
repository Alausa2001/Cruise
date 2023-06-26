# Cruise

The Order Management API is a TypeScript-based RESTful API built using the Express web framework, Prisma as the ORM (Object-Relational Mapping) tool, and MySQL as the underlying database.
It provides endpoints to manage orders.

### Endpoints:

#### Create an Order:

Route: POST /orders
Creates a new order with the provided item name, price, and quantity.

#### GET all Orders: 

Route: GET /orders
Retrieves all orders in a paginated manner, 10 orders per page.


#### GET an Order by ID:

Route: GET /orders/:id
Retrieves a specific order by its unique ID.


#### Update an Order:

Route: PUT /orders/:id
Updates an existing order with the provided item name, price, or quantity.


##### Delete an Order:

Route: DELETE /orders/:id
Deletes a specific order by its unique ID.

Documentation generated using Swagger (OpenAPI).
Swagger documentation available at /api-docs endpoint.




## USAGE

### Start MySQL:  
```sudo service mysql start```

### Clone the project
```git clone https://github.com/Alausa2001/Cruise.git```

In the project directory do:

### Create a user and the database:  
```cat db_setup.sql | sudo mysql -uroot -p```

 ### start the server
```npm run start-server``` 
