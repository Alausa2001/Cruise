import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import OrderController from './controllers/orderController';

// swagger docs
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Order Management API');
});



app.post('/orders', OrderController.createOrder);

app.get('/orders',  OrderController.getAllOrders);
app.get('/orders/:id',  OrderController.getOrderById);

app.put('/orders/:id',  OrderController.updateOrder);
app.delete('/orders/:id',  OrderController.deleteOrder);

app.get('/status/:status', OrderController.getOrdersByStatus);
app.put('/:id/status', OrderController.updateOrderStatus);

// swagger docs
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Order Management API',
        version: '1.0.0',
        description: 'API for managing orders',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ['./src/controllers/*.ts'],
    paths: {
      '/orders': {
        get: {
          summary: 'Retrieve all orders',
          description: 'Get a paginated list of all orders',
          parameters: [
            {
              name: 'page',
              in: 'query',
              description: 'Page number',
              required: false,
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Number of items per page',
              required: false,
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
            },
            '500': {
              description: 'Failed to fetch orders',
            },
          },
        },
      },
      '/orders/{id}': {
        get: {
          summary: 'Retrieve an order by ID',
          description: 'Get details of an order by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Order ID',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
            },
            '404': {
              description: 'Order not found',
            },
            '500': {
              description: 'Failed to fetch order',
            },
          },
        },
        put: {
          summary: 'Update an order by ID',
          description: 'Update the details of an order by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Order ID',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'Successful response',
            },
            '500': {
              description: 'Failed to update order',
            },
          },
        },
        delete: {
          summary: 'Delete an order by ID',
          description: 'Delete an order by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Order ID',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
            },
            '500': {
              description: 'Failed to delete order',
            },
          },
        },
      },
      '/orders/status/{status}': {
        get: {
          summary: 'Retrieve orders by status',
          description: 'Get a paginated list of orders filtered by status',
          parameters: [
            {
              name: 'status',
              in: 'path',
              description: 'Order status',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'page',
              in: 'query',
              description: 'Page number',
              required: false,
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              name: 'limit',
              in: 'query',
              description: 'Number of items per page',
              required: false,
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
            },
            '500': {
              description: 'Failed to fetch orders by status',
            },
          },
        },
      },
      '/orders/{id}/status': {
        put: {
          summary: 'Update order status',
          description: 'Update the status of an order by its ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'Order ID',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'Successful response',
            },
            '500': {
              description: 'Failed to update order status',
            },
          },
        },
      },
    },  
};

  
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
