export const bookFilterableFields = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'category',
  'minPrice',
  'maxPrice',
];
export const bookSearchableFields = ['title', 'author', 'genre', 'categoryId'];

export const bookRelationalFields: string[] = ['category'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
