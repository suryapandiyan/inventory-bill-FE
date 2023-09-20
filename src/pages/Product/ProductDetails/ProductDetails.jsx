import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";
import { FaRupeeSign } from "react-icons/fa";

const ProductDetails = () => {
  const { handleHead, config } = useContext(DataContext);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const handleFetchSingleProduct = async (id) => {
    try {
      const fetchedproductData = await api.get(`/api/products/${id}`, config);
      if (fetchedproductData.data) {
        setProduct(fetchedproductData.data);
      } else {
        setProduct([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchSingleProduct(id);
    handleHead("Product Details");
  }, []);

  return (
    <section className='profile__page'>
      <div className='profile__data'>
        <div className='box rounded container'>
          {product.name ? (
            <>
              <div className='profile__img'>
                <img
                  src={product.image.filePath}
                  alt=''
                  className='img'
                />
              </div>
              <div className='profile__details'>
                <span>Item Name : {product.name}</span>
                <span>Item Category : {product.category}</span>
                <span>Item Code : {product.itemCode}</span>
                <span>
                  Item Price : <FaRupeeSign /> {product.price}
                </span>
                <span>Item Quantity : {product.quantity}</span>
                <span>Item Price : {product.description}</span>
                <span>Created On : {product.createdAt}</span>
                <span>Updated On : {product.updatedAt}</span>
              </div>
            </>
          ) : (
            <p>No Items Found</p>
          )}
        </div>
      </div>
      <div className='d-flex justify-content-center mt-4 '>
        <Link
          to='/Dashboard'
          className='text-white button rounded'
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default ProductDetails;