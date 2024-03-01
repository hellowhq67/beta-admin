"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ProductTable.module.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://beta-admin-r3ibi1xkr-hellowhq67.vercel.app/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`https://beta-admin-r3ibi1xkr-hellowhq67.vercel.app/api/products/${_id}`);
      if (res.status === 200) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== _id));
        toast.success('Product deleted');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>User Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.productImage1} alt="Product" className={styles.productImage} />
              </td>
              <td>{product.productName}</td>
              <td>{product.userName}</td>
              <td>{product.price}</td>
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductTable;
