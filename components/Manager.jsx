"use client";
import { useState, useEffect } from "react";
import PasswordForm from "./Home/PasswordForm";
import PasswordSection from "./Home/PasswordSection";


const Manager = ({userId}) => {
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("/api/password?userId=" + userId);
    let {passwords} = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords()
  }, []);

 

  


  
  return (
    <>
      <PasswordForm userId={userId} passwordArray={passwordArray} setPasswordArray={setPasswordArray} />
      <PasswordSection passwordArray={passwordArray} setPasswordArray={setPasswordArray}/>
    </>
  );
};

export default Manager;
