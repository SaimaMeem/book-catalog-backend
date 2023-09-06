import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

import { User } from '.prisma/client';

const getAllUsers = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.user.update({ where: { id }, data: payload });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

const getMyProfile = async (user: JwtPayload | null): Promise<User | null> => {
  console.log(user);

  const result = await prisma.user.findUnique({ where: { id: user?.id } });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
};
