import React from 'react';
import PaginatedTable from '../../components/table/PaginatedTable';

const items = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
  { id: 4, name: 'Product 4', price: 400 },
  { id: 5, name: 'Product 5', price: 500 }
];

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' }
];

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
      <PaginatedTable items={items} columns={columns} />
    </div>
  );
}
