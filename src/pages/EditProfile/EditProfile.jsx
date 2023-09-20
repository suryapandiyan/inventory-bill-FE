import React, { useContext, useEffect, useState } from "react";
import "./editprofile.css";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import TextAreaField from "../../components/textField/TextAreaField";
import * as Yup from "yup";

const EditProfile = () => {
  const {
    handleProfileUpdate,
    handlePasswordUpdate,
    handlePictureUpdate,
    loggedUser,
    isLoading,
    handleHead,
  } = useContext(DataContext);
  const [profileImage, setProfileImage] = useState();

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    lName: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    phone: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(10, "Must be at least 10 Characters")
      .required("Required"),
    bio: Yup.string()
      .max(250, "Must be less than 10 Characters")
      .min(1, "Must be at least 1 Characters")
      .required("Required"),
  });

  const validate2 = Yup.object({
    oldpassword: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
  });

  const savePicture = async (e) => {
    e.preventDefault();
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        image.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        // First save image to cloudinary
        const response = await fetch(`${import.meta.env.VITE_URL}`, {
          method: "post",
          body: image,
        });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        // Save Profile
        const formData = {
          email: loggedUser.email,
          photo: imageURL,
        };
        handlePictureUpdate(formData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    handleHead("Update Profile");
  }, []);

  return (
    <section className='profile'>
      <div className='container mt-5 update__profile'>
        <Formik
          initialValues={{
            name: loggedUser.name,
            lName: loggedUser.lName,
            email: loggedUser.email,
            phone: loggedUser.phone,
            bio: loggedUser.bio,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleProfileUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className='detailCards'>
                <h3 style={{ color: "var(--theme" }}>Update Profile :</h3>
                <TextField
                  label='First Name'
                  name='name'
                  id='name'
                  type='text'
                  placeholder='Enter First Name'
                />
                <TextField
                  label='Last Name'
                  name='lName'
                  id='lName'
                  type='text'
                  placeholder='Enter Last Name'
                />
                <TextField
                  label='Email'
                  name='email'
                  id='email'
                  type='email'
                  disabled
                />
                <TextField
                  label='Contact No'
                  name='phone'
                  id='phone'
                  type='text'
                  placeholder='Enter Contact No.'
                />
                <TextAreaField
                  label='Bio'
                  name='bio'
                  id='bio'
                  type='text'
                  placeholder='Enter Bio'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className='container mt-5 update__profile'>
        <form onSubmit={savePicture}>
          <div className='detailCards'>
            <h3 style={{ color: "var(--theme" }}>Update Picture :</h3>
            <div className='form-group mb-3 '>
              <label
                htmlFor='photo'
                className='label__style mb-0'
              >
                Photo :
              </label>
              <div>
                <input
                  className={`form-control shadow-none `}
                  type='file'
                  id='photo'
                  name='photo'
                  multiple={false}
                  accept='image/*'
                  required
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className='text-center mt-3'>
              <button
                className='text-white button rounded'
                type='submit'
              >
                {isLoading ? (
                  <span className='spinner-border spinner-border-sm text-warning'></span>
                ) : (
                  "Update Picture"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='container mt-5 update__profile'>
        <Formik
          initialValues={{
            oldpassword: "",
            password: "",
            cPassword: "",
          }}
          validationSchema={validate2}
          onSubmit={(values, { resetForm }) => {
            handlePasswordUpdate(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className='detailCards'>
                <h3 style={{ color: "var(--theme" }}>Update Password :</h3>
                <TextField
                  label='Old Password'
                  name='oldpassword'
                  id='oldpassword'
                  type='password'
                  placeholder='Enter Old Password'
                />
                <TextField
                  label='Password'
                  name='password'
                  id='password'
                  type='password'
                  placeholder='Enter Password'
                />
                <TextField
                  label='Confirm Password'
                  name='cPassword'
                  id='cPassword'
                  type='password'
                  placeholder='Confirm Password'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Update Password"
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

export default EditProfile;