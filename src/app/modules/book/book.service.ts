import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book) => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllBooks = async (): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getAllBooks,
};
