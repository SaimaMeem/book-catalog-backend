export type IOrder = {
  userId: string;
  orderedBooks: {
    bookId: string;
    quantity: number;
  };
  status?: 'pending' | 'shipped' | 'delivered';
};
