// src/ProductTable.tsx
import React, { useState } from 'react';


const ProductTable: React.FC = () => {
  const [data, setData] = useState<Product[]>(products);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'ascending' | 'descending' } | null>({
    key: 'price', direction: 'ascending'
  });

  const sortData = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
console.log('sortConfig', sortConfig)
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Product) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    if (sortConfig.direction === 'ascending') {
      return '▲';
    } else {
      return '▼';
    }
  };

  return (
    <>
    
   
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" className="px-6 py-3"
        
            onClick={() => sortData('name')}
                >
          
          <div className="flex items-center">
         
          NAme {getSortIcon('name')}
         
          </div>
        </th>
        <th scope="col" className="px-6 py-3"
          
            onClick={() => sortData('category')}
        
        >
          Position
           {getSortIcon('category')}

        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>


          
          {data.map((product) => (
          <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
          </div>
        </td>
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
          <div className="ps-3">
            <div className="text-base font-semibold">{
          
          
          product.name          }</div>
            <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
          </div>  
        </th>
        <td className="px-6 py-4">
        {product.name}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> Online
          </div>
        </td>
        <td className="px-6 py-4">
          {/* Modal toggle */}
          <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
        </td>
        
          </tr>
        ))}  

    
  
    </tbody>
  </table>

    </>
    
  );
};

export default ProductTable;



// src/data.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
  }
  
  export const products: Product[] = [
    { id: 1, name: "Product 1", price: 29.99, category: "Category 1" },
    { id: 2, name: "Product 2", price: 19.99, category: "Category 2" },
    { id: 3, name: "Product 3", price: 39.99, category: "Category 1" },
    { id: 4, name: "Product 4", price: 49.99, category: "Category 3" },
    // Add more products as needed
  ];