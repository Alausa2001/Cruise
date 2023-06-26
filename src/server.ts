import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import OrderController from './controllers/orderController';


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

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
