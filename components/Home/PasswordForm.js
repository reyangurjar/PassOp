"use client"
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UrlIcon from "@/assets/icons/LinkIcon";
import UserIcon from "@/assets/icons/UserIcon";
import { set } from "mongoose";
import AddIcon from "@/assets/icons/AddIcon";
const PasswordForm = ({userId,setPasswordArray,passwordArray}) => {
  const imgRef = useRef();
  const inputRef = useRef();
  const [form, setForm] = useState({  url: "", username: "", password: "" });

  const showPassword = () => {
    if (imgRef.current.src.includes("icons/eye.png")) {
      imgRef.current.src = "icons/eyecross.png";
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
      imgRef.current.src = "icons/eye.png";
    
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = async () => {
    if (
      form.url.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        const res = await fetch("/api/password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, userId: userId }),
        });
        const data = await res.json();
        console.log(data)
        setPasswordArray(setPasswordArray => [...setPasswordArray, data.password]);
    
      toast("Password updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
     
      } catch (error) {
        console.log(error)
        toast("Failed to save Password, check console", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } else {
      toast("Error: Type min. 3 Characters in each input");
    }
  };
 
  
  return <>
  <div className="text-black flex flex-col p-4 items-center gap-8">
  <label className="input border border-green-500 w-full py-1 px-2 input-bordered flex items-center gap-2">
    <UrlIcon />
    <input
      onChange={handleChange}
      name="url"
      value={form.url}
      placeholder="Enter Url"
      className="w-full"
      type="text"
    />
  </label>

  <div className="md:flex-row flex flex-col w-full gap-8">
    <label className="input border border-green-500 w-full py-1 px-2 input-bordered flex items-center gap-2">
      <UserIcon />
      <input
        onChange={handleChange}
        name="username"
        value={form.username}
        placeholder="Enter Username"
        className="w-full"
        type="text"
      />
    </label>

    <div className="relative  flex input border border-green-500 ">
      <input
        onChange={handleChange}
        name="password"
        ref={inputRef}
        value={form.password}
        placeholder="Enter Password"
        className=" rounded-lg  w-full "
        type="password"
      />
      <div
        className="absolute right-[7px] cursor-pointer top-[10px]"
        onClick={showPassword}
      >
        <img
          ref={imgRef}
          src="icons/eye.png"
          alt="eyeicon"
          width={27}
        />
      </div>
    </div>
  </div>
  <button
    className="flex gap-1 border border-green-900 bg-green-500 rounded-lg p-2 hover:bg-green-600 w-fit justify-center items-center"
    onClick={savePassword}
  >
    <AddIcon/>
    Add 
  </button>
</div>
</>
};

export default PasswordForm;
