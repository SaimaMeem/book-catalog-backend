import prisma from '../../../shared/prisma';
import { IOrder } from './order.interface';

const createOrder = async (data: IOrder) => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

export const OrderService = {
  createOrder,
};
