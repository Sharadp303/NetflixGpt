import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [cookies,removeCookie]=useCookies([])
  
  const [isSignInForm, setSignInForm] = useState(true);
  const [err, setErr] = useState(null);
  if(cookies){
    console.log("COokies",cookies);
  }
  const email = useRef();
  const password = useRef();
  const fullname = useRef();
  const phone = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    const message = checkValidData(email.current.value, password.current.value);

    if (message) {
      setErr(message);
      return;
    }

    if (!isSignInForm) {
      await signUp(
        email.current.value,
        password.current.value,
        fullname.current.value,
        phone.current.value
      );
    } else {
      await signIn(email.current.value, password.current.value);
    }
  };

  const signIn = async (emailValue, passwordValue) => {
    try {
      console.log(emailValue, passwordValue);
      const payload = {
        email: emailValue,
        password: passwordValue,
      };
      const res = await fetch("http://localhost:5055/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(res);
        throw new Error(data);
      }

      dispatch(addUser(data.user))
      navigate('/browse')
    } catch (error) {
      console.log("Error occurred:", error);
      setErr(error.message);
    }
  };

  const signUp = async (
    emailValue,
    passwordValue,
    fullNameValue,
    phoneValue
  ) => {
    try {
      const payload = {
        name: fullNameValue,
        phone: phoneValue,
        email: emailValue,
        password: passwordValue,
      };
      const res = await fetch("http://localhost:5055/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(res);
        throw new Error(data);
      }
      dispatch(addUser(data.user))
      navigate('/browse')

    } catch (error) {
      console.log("Error occurred:", error);
      setErr(error.message);
    }
  };
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
    setErr(null);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg-img"
        />
      </div>
      <form
        onSubmit={handleForm}
        className="absolute w-4/12 p-12 bg-black my-36 left-0 right-0 mx-auto text-white rounded-lg opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={fullname}
            className="p-3 my-2 w-full bg-gray-700 border border-gray-800 rounded"
            type="text"
            placeholder="Full Name"
            required
          />
        )}

        {!isSignInForm && (
          <input
            ref={phone}
            className="p-3 my-2 w-full bg-gray-700 border border-gray-800 rounded"
            type="tel"
            placeholder="Phone"
            required
          />
        )}

        <input
          ref={email}
          className="p-3 my-2 w-full bg-gray-700 border border-gray-800 rounded"
          type="text"
          placeholder="Email"
          required
        />

        <input
          ref={password}
          className="p-3 my-2 w-full bg-gray-700 border border-gray-800 rounded"
          type="text"
          placeholder="Password"
          required
        />

        {<h2 className="font-bold p-2 text-red-400">{err}</h2>}

        <button className="p-2 my-2 w-full bg-red-600 border border-gray-800 rounded">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="my-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
