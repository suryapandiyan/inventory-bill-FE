import React, { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../../components/textField/TextField";
import TextAreaField from "../../components/textField/TextAreaField";
import SelectField from "../../components/textField/SelectField";
import * as Yup from "yup";

const AddProduct = () => {
  const { isLoading, handleAddProduct } = useContext(DataContext);

  const itemCode = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const output = letter + "-" + number;
    return output;
  };

  const validate = Yup.object({
    name: Yup.string()
      .max(25, "Must be less than 15 Characters")
      .min(3, "Must be at least 6 Characters")
      .required("Required"),
    category: Yup.string().required("Required"),
    quantity: Yup.number()
      .max(100, "Must be less than 100")
      .min(0, "Must be at least 1")
      .required("Required"),
    price: Yup.number().min(0, "Must be at least 1").required("Required"),
    description: Yup.string()
      .max(250, "Must be less than 10 Characters")
      .min(3, "Must be at least 1 Characters")
      .required("Required"),
    file: Yup.mixed().nullable().required(),
  });

  const saveProduct = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("itemCode", itemCode(values.category));
    formData.append("image", values.file);
    handleAddProduct(formData);
  };

  return (
    <section className='productEdit'>
      <div className='container mt-5 update__profile'>
        <Formik
          initialValues={{
            name: "",
            category: "",
            quantity: "",
            price: "",
            description: "",
            file: null,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            saveProduct(values);
            resetForm({ values: "" });
            values.file = null;
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className='detailCards'>
                <h3 style={{ color: "var(--theme" }}>Add Items :</h3>
                <TextField
                  label='Item Name'
                  name='name'
                  id='name'
                  type='text'
                  placeholder='Enter Item Name'
                />
                <div className='form-group mb-3 '>
                  <label
                    htmlFor='file'
                    className='label__style mb-0'
                  >
                    Item Photo
                  </label>
                  <div>
                    <input
                      className={`form-control shadow-none`}
                      autoComplete='off'
                      type='file'
                      name='file'
                      accept='image/png, image/gif, image/jpeg'
                      onChange={(e) => {
                        setFieldValue("file", e.target.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name='file'
                      component='p'
                      className='errorMessage'
                    />
                  </div>
                </div>
                {values.file != null && (
                  <div className='image__preview rounded'>
                    <img
                      src={URL.createObjectURL(values.file)}
                      alt='product'
                      className='rounded'
                      width={200}
                      height={200}
                    />
                  </div>
                )}
                <SelectField
                  label='Category'
                  name='category'
                  id='category'
                />
                <TextField
                  label='Quantity'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Enter the Quantity'
                />
                <TextField
                  label='Price'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Enter Price'
                />
                <TextAreaField
                  label='Description'
                  name='description'
                  id='description'
                  type='text'
                  placeholder='Enter Description'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Add Items"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
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

export default AddProduct;