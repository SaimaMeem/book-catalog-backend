import { User } from '.prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { CommonHelpers } from '../../../helpers/commonHelpers';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
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

  //create access token & refresh token
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  //check if the refresh token is from a valid user
  const isUserExist = await CommonHelpers.isUserExist(id, 'id');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, role: userRole } = isUserExist;
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: userId,
      role: userRole,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signUp,
  loginUser,
  refreshToken,
};
