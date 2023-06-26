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
};

  
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
