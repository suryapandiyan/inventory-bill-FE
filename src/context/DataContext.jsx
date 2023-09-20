import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import useWindowSize from "../hooks/useWindowSize";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // variables and functions
  const { width } = useWindowSize();
  const [head, setHead] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  //for pages

  const [flag, setFlag] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [product, setProduct] = useState(0);
  const [value, setValue] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryQuantity, setCategoryQuantity] = useState("");
  const [chartData, setChartData] = useState({
    labels: fetchedData.map((data) => data.name),
    datasets: [
      {
        label: "Avalable Stock",
        data: fetchedData.map((data) => data.quantity),
        backgroundColor: [
          "#ccb0e8",
          "#855bb0",
          "#786090",
          "#E0B0FF",
          "#C3B1E1",
          "#CCCCFF",
        ],
        borderJoinStyle: "round",
      },
    ],
  });

  const [chartCategoryData, setChartCatogoryData] = useState([]);

  // handle signin

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.formatUser);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/users/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.formatUser);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle signout
  const handleLogout = () => {
    setToken(null);
    setLoggedUser(null);
    setHead("Class");
    navigate("/");
    localStorage.clear();
  };

  // handle sign up
  const handleSignUp = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/users/register", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  // handle profile update
  const handleProfileUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch("/api/users/updateuser", data, config);
      const user = response.data;
      const updatedData = { token, user };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.user);
      toast.success("Profile Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle profile picture update
  const handlePictureUpdate = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        "/api/users/updateuserphoto",
        data,
        config
      );
      const user = response.data;
      const updatedData = { token, user };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedData));
      setLoggedUser(updatedData.user);
      toast.success("Picture Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password update
  const handlePasswordUpdate = async (data) => {
    setIsLoading(true);
    const passwordData = data;
    passwordData.email = loggedUser.email;

    try {
      await api.patch("/api/users/changepassword", passwordData, config);
      toast.success("password Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle account confirming
  const handleConfirm = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      await api.patch(`/api/users/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle forgot password
  const handleForgot = async (data) => {
    setIsLoading(true);

    try {
      await api.post("/api/users/forgotpassword", data);
      toast.success("Reset link send to your mail");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle password reset
  const handleReset = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/api/users/resetpassword/${resetToken}`,
        data
      );
      setResetToken("");
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle heading
  const handleHead = (data) => {
    setHead(data);
    setToggle(false);
    localStorage.setItem("head", data);
  };

  // handle product update
  const handleUpdateProduct = async (e) => {
    setIsLoading(true);

    const id = e.id;
    const data = e.formData;

    try {
      await api.patch(`/api/products/${id}`, data, config);
      toast.success("Item Updated Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  //handle fetch product
  const fetchAllProducts = async () => {
    try {
      const fetchedproductData = await api.get("/api/products", config);
      if (fetchedproductData) {
        const tempProducts = fetchedproductData.data.filter(
          (product) =>
            product.name.toLowerCase().trim().includes(search.toLowerCase()) ||
            product.category.toLowerCase().trim().includes(search.toLowerCase())
        );
        let total = [...tempProducts];

        let quantity = total.filter((e) => {
          return e.quantity === "0";
        });

        let uniqueCategory = total.map((e) => e.category);

        let temp = {};

        // Iterate through the data array
        total.forEach((item) => {
          const category = item.category;
          const quantity = parseInt(item.quantity);
          if (!temp[category]) {
            temp[category] = quantity;
          } else {
            temp[category] += quantity;
          }
        });

        let price;

        if (total.length !== 0) {
          temp = Object.keys(temp).map((category) => ({
            category: category,
            quantity: temp[category],
          }));

          setCategoryQuantity(temp);

          price = total
            .map((item) => Number(item.quantity) * Number(item.price))
            .reduce((acc, cur) => acc + cur);

          uniqueCategory = uniqueCategory.reduce((acc, cur) => {
            if (cur in acc) {
              acc[cur]++;
            } else {
              acc[cur] = 1;
            }
            return acc;
          }, {});
        } else {
          setCategoryQuantity([]);
        }

        setProduct(tempProducts.length);
        setStock(quantity.length);
        setValue(price);
        setCategory(Object.keys(uniqueCategory).length);
        setFetchedData(tempProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle add product
  const handleAddProduct = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post(`/api/products`, data, config);
      toast.success("Item Added Successfully");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  // handle product update
  const handleProductDelete = async (id) => {
    try {
      const response = await api.delete(`/api/products/${id}`, config);
      if (response.data.updatedProductList.length === 0) {
        setFetchedData([]);
        setChartCatogoryData([]);
        setChartData([]);
      }
      toast.success("Item Deleted Successfully");
      setTrigger(!trigger);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  //

  return (
    <DataContext.Provider
      value={{
        head,
        setHead,
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        handleSignIn,
        handleLogout,
        handleSignUp,
        handleProfileUpdate,
        handleConfirm,
        handleForgot,
        handleReset,
        isLoading,
        setIsLoading,
        width,
        flag,
        setFlag,
        config,
        trigger,
        setTrigger,
        handleHead,
        toggle,
        setToggle,
        handlePasswordUpdate,
        handlePictureUpdate,
        handleUpdateProduct,
        handleProductDelete,
        handleAddProduct,
        fetchedData,
        setFetchedData,
        product,
        setProduct,
        value,
        setValue,
        stock,
        setStock,
        category,
        setCategory,
        search,
        setSearch,
        categoryQuantity,
        setCategoryQuantity,
        chartData,
        setChartData,
        chartCategoryData,
        setChartCatogoryData,
        fetchAllProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;