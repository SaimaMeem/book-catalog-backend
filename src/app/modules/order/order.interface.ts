export type IOrder = {
  userId: string;
  orderedBooks: {
    bookId: string;
    quantity: number;
  };
  status?: 'PENDING' | 'SHIPPED' | 'DELIVERED';
};
