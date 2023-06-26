// src/orderController.ts

import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

interface Order {
  quantity:number;
  name: string;
  price: number;
}

type CreateOrderInput = Prisma.OrderCreateInput;
type UpdateOrderInput = Prisma.OrderUpdateInput;


const prisma = new PrismaClient();

class OrderController {
    static async createOrder(req: Request, res: Response) {
        const { price, name, quantity }: CreateOrderInput = req.body;
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
            res.json(orders);
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
            res.json(order);
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
        const { name, quantity, price }: UpdateOrderInput = req.body;
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
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete order' });
        }
    }
}