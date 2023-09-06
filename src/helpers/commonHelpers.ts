import prisma from '../shared/prisma';

const isUserExist = async (enteredEmail: string, field: string) => {
  return await prisma.user.findFirst({
    where: {
      [field]: enteredEmail,
    },
  });
};

export const CommonHelpers = {
  isUserExist,
};
