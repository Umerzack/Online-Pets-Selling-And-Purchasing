import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemThunk } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();

  // Fetch products from server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://pet-selling-and-purchasing-server.vercel.app/products"
        );

        const data = await response.json();
        const { products } = data;

        setData(products);
        setFilter(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addItemThunk(product));
  };

  const Loading = () => (
    <>
      <Skeleton height={40} width={560} />
      <Skeleton height={592} />
    </>
  );

  const filterProduct = (category) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilter(data);
    } else {
      setFilter(data.filter((product) => product.category === category));
    }
  };

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button
          className={`btn btn-outline-dark btn-sm m-2 ${
            activeFilter === "all" ? "active" : ""
          }`}
          onClick={() => filterProduct("all")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-dark btn-sm m-2 ${
            activeFilter === "electronics" ? "active" : ""
          }`}
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
        <button
          className={`btn btn-outline-dark btn-sm m-2 ${
            activeFilter === "fashion" ? "active" : ""
          }`}
          onClick={() => filterProduct("fashion")}
        >
          Fashion
        </button>
      </div>
      {filter.map((product) => (
        <div
          key={product.id}
          className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        >
          <div className="card text-center h-100">
            <Link to={"/product/" + product.id}>
              <img
                className="card-img-top p-3"
                src={product.image}
                alt="Product"
                height={300}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
