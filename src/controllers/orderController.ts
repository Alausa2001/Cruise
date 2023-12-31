// src/orderController.ts

import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

interface Order {
  quantity:number;
  name: string;
  price: number;
  status: string;
}



const prisma = new PrismaClient();

class OrderController {
    static async createOrder(req: Request, res: Response) {
        const { price, name, quantity }: Order = req.body;
        try {
            const order = await prisma.order.create({
                data: {
                    price,
                    name,
                    quantity
                },
            });
            res.status(201).json(order)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    };
        
    static async getAllOrders(req: Request, res: Response) {
        const { page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page as string, 10);
        const parsedLimit = parseInt(limit as string, 10);
        try {
            const orders = await prisma.order.findMany({
            skip: (parsedPage - 1) * parsedLimit,
            take: parsedLimit,
            });
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    };
    
    static async getOrderById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await prisma.order.findUnique({
            where: {
                id: parseInt(id, 10),
            },
            });
            if (order) {
            res.status(200).json(order);
            } else {
            res.status(404).json({ error: 'Order not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    };
    
    static async updateOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { name, quantity, price }: Order = req.body;
        try {
            const order = await prisma.order.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                price,
                quantity,
                name,
            },
            });
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update order' });
        }
    };

    static async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const order = await prisma.order.delete({
            where: {
                id: parseInt(id, 10),
            },
            });
            res.json({ status: "order deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete order' });
        }
    }
    
    static async getOrdersByStatus(req: Request, res: Response) {
        const { status, page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page as string, 10);
        const parsedLimit = parseInt(limit as string, 10);
        try {
          const orders = await prisma.order.findMany({
            where: {
              status: status as string,
            },
            skip: (parsedPage - 1) * parsedLimit,
            take: parsedLimit,
          });
          res.status(200).json(orders);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch orders by status' });
        }
      }
    
      static async updateOrderStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status }: Order = req.body;
        try {
          const order = await prisma.order.update({
            where: {
              id: parseInt(id, 10),
            },
            data: {
              status,
            },
          });
          res.status(200).json(order);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to update order status' });
        }
      }
}

export default OrderController;
