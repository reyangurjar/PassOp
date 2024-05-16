import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 
import PasswordSection from "@/components/Home/PasswordSection";
import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import PasswordForm from "@/components/Home/PasswordForm";
import Manager from "@/components/Manager";

export default async function Home() {
  const session = await getServerSession(authOptions);



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        closeOnClick={true}
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer containerId={"ToastId"} />
 
     
      <div className=" md:mycontainer my-4">
        <h1 className="font-bold text-center text-4xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Op/&gt;</span>
        </h1>
        <p className="text-green-500 text-center">Your own password manager</p>
        {session ? (
          <>
       <Manager userId={session?.user?.id}/>
       </>
        ): (
          <LoginForm />
        )}
        
       
    
    
      </div>
      
    </>
  );

   

    


}
