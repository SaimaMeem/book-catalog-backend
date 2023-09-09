import { Order } from '.prisma/client';
import prisma from '../../../shared/prisma';
import { IOrder } from './order.interface';

const createOrder = async (data: IOrder) => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllOrders = async (loggedUser: any): Promise<Order[] | null> => {
  let whereConditions = {};
  if (loggedUser.role === 'CUSTOMER') {
    whereConditions = {
      userId: loggedUser.id,
    };
  }
  const result = await prisma.order.findMany({
    where: whereConditions,
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
