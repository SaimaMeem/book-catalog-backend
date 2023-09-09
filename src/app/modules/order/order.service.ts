/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '.prisma/client';
import prisma from '../../../shared/prisma';
import { IOrder } from './order.interface';

const createOrder = async (data: IOrder) => {
  const result = await prisma.order.create({
    data,
    include: {
      user: true,
    },
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
    include: {
      user: true,
    },
  });
  return result;
};

const getSingleOrder = async (
  id: string,
  loggedUser: any
): Promise<Order | null> => {
  const whereConditions: any[] = [{ id }];

  if (loggedUser.role === 'CUSTOMER') {
    whereConditions.push({ userId: loggedUser.id });
  }

  const result = await prisma.order.findFirst({
    where: {
      AND: whereConditions,
    },
    include: {
      user: true,
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
