import { User } from '.prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { CommonHelpers } from '../../../helpers/commonHelpers';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginRequest, ILoginResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

const signUp = async (data: User): Promise<User | null> => {
  const result = await prisma.user.create({ data });
  return result;
};

const loginUser = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const { email: enteredEmail, password: enteredPassword } = payload;
  const isUserExist = await CommonHelpers.isUserExist(enteredEmail, 'email');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, password: userPassword, role: userRole } = isUserExist;

  if (userPassword && enteredPassword !== userPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match.');
  }

  //create access token
  const token = jwtHelpers.createToken(
    {
      id: userId,
      role: userRole,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { token };
};

export const AuthService = {
  signUp,
  loginUser,
};
