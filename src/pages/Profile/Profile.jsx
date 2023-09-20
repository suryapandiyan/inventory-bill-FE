import React, { useContext } from "react";
import "./profile.css";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedUser } = useContext(DataContext);
  return (
    <section className='profile__page'>
      <div className='profile__data'>
        <div className='box rounded container'>
          <div className='profile__img'>
            <img
              src={loggedUser.photo}
              alt=''
              className='img'
              width={400}
              height={400}
            />
          </div>
          <div className='profile__details'>
            <span>First Name : {loggedUser.name}</span>
            <span>Last Name : {loggedUser.lName}</span>
            <span>Email : {loggedUser.email}</span>
            <span>Contact No : {loggedUser.phone}</span>
            <span>Bio : {loggedUser.bio}</span>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-4 '>
        <Link
          to='/editprofile'
          className='text-white button rounded'
        >
          Edit Profile
        </Link>
      </div>
    </section>
  );
};

export default Profile;