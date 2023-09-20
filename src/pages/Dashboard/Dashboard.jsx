import React, { useEffect, useContext } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaEye,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";
import DonutChart from "../../components/chart/DonutChart";
import { ToastContainer, Zoom } from "react-toastify";

const Dashboard = () => {
  const {
    setTrigger,
    trigger,
    handleProductDelete,
    fetchedData,
    product,
    value,
    stock,
    category,
    search,
    setSearch,
    categoryQuantity,
    chartData,
    setChartData,
    chartCategoryData,
    setChartCatogoryData,
    fetchAllProducts,
    handleHead,
  } = useContext(DataContext);

  useEffect(() => {
    fetchAllProducts();
  }, [setTrigger, trigger, search]);

  useEffect(() => {
    setChartData({
      labels: fetchedData.map((data) => data.name),
      datasets: [
        {
          label: "Avalable Stock by Item",
          data: fetchedData.map((data) => data.quantity),
          backgroundColor: [
            "#ccb0e8",
            "#855bb0",
            "#786090",
            "#E0B0FF",
            "#C3B1E1",
            "#CCCCFF",
          ],
          borderRadius: 10,
          borderJoinStyle: "round",
          borderColor: "black",
          hoverOffset: 25,
        },
      ],
    });
    if (categoryQuantity.length !== 0) {
      setChartCatogoryData({
        labels: categoryQuantity.map((data) => data.category),
        datasets: [
          {
            label: "Avalable Stock by Category",
            data: categoryQuantity.map((data) => data.quantity),
            backgroundColor: [
              "#ccb0e8",
              "#855bb0",
              "#786090",
              "#E0B0FF",
              "#C3B1E1",
              "#CCCCFF",
            ],
            borderRadius: 10,
            borderJoinStyle: "round",
            borderColor: "black",
            hoverOffset: 25,
          },
        ],
      });
    }
  }, [fetchedData, categoryQuantity]);

  useEffect(() => {
    handleHead("Dashboard");
  }, []);

  return (
    <section className='dashboard pt-2'>
      <div className='activities__box container'>
        <h3 className=' text-center p-2'>Inventory Stats</h3>
        <div className='problem__solved gap-3'>
          <div className='codekata'>
            <FaShoppingCart className='icon' />
            <div className='stats'>
              <span>Total Products</span>
              <span>{product}</span>
            </div>
          </div>
          <div className='codekata'>
            <FaRupeeSign className='icon' />
            <div className='stats'>
              <span>Total Value</span>
              <span>{value}</span>
            </div>
          </div>
          <div className='codekata'>
            <AiOutlineStop className='icon' />
            <div className='stats'>
              <span>Out of Stock</span>
              <span>{stock}</span>
            </div>
          </div>
          <div className='codekata'>
            <BiCategory className='icon' />
            <div className='stats'>
              <span>Category</span>
              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className='activities__box container'>
        <h3 className=' text-center p-2'>Inventory Charts</h3>
        <div className='problem__solved gap-3'>
          <div
            className={`chart__box d-flex ${
              fetchedData.length === 0 ? "hide" : ""
            }`}
          >
            <div className='chart-container d-flex'>
              {chartData.length !== 0 && <DonutChart chartData={chartData} />}
            </div>
            <div
              className={`chart-container d-flex${
                fetchedData.length === 0 ? "hide" : ""
              }`}
            >
              {chartCategoryData.length !== 0 && (
                <DonutChart chartData={chartCategoryData} />
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className='activities__box container'>
        <div className='problem__solved'>
          <h3 className=' p-2'>Inventory Items</h3>
          <input
            className={`form-control shadow-none`}
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Product by Name/Category'
          />
        </div>
      </div>
      <br />
      <div className='activities__box container'>
        <div className='problem__solved gap-3'>
          {fetchedData &&
            fetchedData.map((item) => {
              return (
                <div
                  className='card'
                  style={{ width: "350px" }}
                  key={item._id}
                >
                  <img
                    className='card-img-top'
                    src={item.image.filePath}
                    alt='Card image'
                    style={{ width: "100%" }}
                  />
                  <div className='card-body'>
                    <h4>Product Name : {item.name}</h4>
                    <p>Product Category : {item.category}</p>

                    <p>
                      Product Price :<FaRupeeSign className='icon' />{" "}
                      {item.price}
                    </p>
                    <p>Product Quantity : {item.quantity}</p>
                    <p>
                      Product Value :{" "}
                      {Number(item.quantity) * Number(item.price)}
                    </p>
                    <div className='d-flex justify-content-evenly'>
                      <Link
                        to={`/product/view/${item._id}`}
                        className='btn button text-white'
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/product/edit/${item._id}`}
                        className='btn button text-white'
                      >
                        <FaRegEdit />
                      </Link>
                      <Link
                        onClick={() => handleProductDelete(item._id)}
                        className='btn button text-white'
                      >
                        <FaTrashAlt />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          {fetchedData.length === 0 && <p>No Items Available </p>}
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </section>
  );
};

export default Dashboard;