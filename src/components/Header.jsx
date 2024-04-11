import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const user=useSelector((store)=>store.user)

  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:5055/logout");
      const data = await res.json();
      console.log(data);
      dispatch(removeUser())
      navigate('/')
    
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <div className=" w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
          className="w-44"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        />
      </div>
      {user && <div>
        <span className="text-white"> {user.name}</span>
        <button className="text-white bg-black" onClick={handleSignOut}>
         Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
