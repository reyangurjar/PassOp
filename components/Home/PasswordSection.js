"use client";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";
import CloseIcon from "@/assets/icons/CloseIcon";
const PasswordSection = ({ passwordArray, setPasswordArray }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    password: "",
    url: "",
    userId: "",
    username: "",
    _id: "",
  });

  const deletePassword = async (_id) => {
    let c = confirm("Are you sure you want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item._id != _id));
      await fetch("/api/password", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: _id }),
      });

      toast("Password deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(passwordArray);
    }
  };


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
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
    let foundIndex = passwordArray.findIndex(x => x._id == form._id);
    const updatedPasswordArray = passwordArray.map((obj, i) => {
      if (i === foundIndex) {
        return form; // Replace with form values
      }
      return obj; // Return original object for other indices
    });
    setPasswordArray(updatedPasswordArray);
    setShowModal(false);
    } catch (error) {
      console.log(error)
      toast("Failed to update Password, check console", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowModal(false);
      return;
    }
    
  };

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);
    toast("Password copied to clipboard");
  };

  return (
    <div className="passwords">
      
      {passwordArray.length === 0 && <div className=" h-[50vh] flex text-2xl font-bold justify-center items-center">No Passwords saved</div>}
      {passwordArray.length != 0 && (
        <>
        <h2 className="py-4 text-black font-bold text-2xl text-center">
        Your passwords
      </h2>
        <table className="table-fixed md:table-auto  w-full rounded-lg  overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2">Url</th>
              <th className="py-2">Username</th>
              <th className="py-2">Password</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {passwordArray.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="wrapword py-2 border-b border-white  whitespace-normal text-wrap text-center w-32">
                    <Link
                      href={"https://" + item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center"
                    >
                      {item.url}
                    </Link>
                  </td>
                  <td className="wrapword py-2 border-b border-white text-center w-32">
                    {item.username}
                  </td>
                  <td className="wrapword py-2 border-b border-white text-center w-32">
                    <div className="flex justify-center gap-2 items-center">
                      <img
                        className=" copyPassword w-6 cursor-pointer "
                        src="/icons/copy.png"
                        alt=""
                        onClick={() => copyPassword(item.password)}
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/icons/copy.gif")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/icons/copy.png")
                        }
                      />
                      {item.password}
                    </div>
                  </td>
                  <td className="wrapword py-2 border-b border-white text-center w-32   ">
                    <div className="flex justify-center gap-2 items-center">
                      <img
                        className=" editPassword w-6 cursor-pointer "
                        src="/icons/edit.png"
                        alt=""
                        onClick={() => {
                          setForm({
                            _id: item._id,
                            userId: item.userId,
                            url: item.url,
                            username: item.username,
                            password: item.password,
                          });
                          setShowModal(true);
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/icons/edit.gif")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/icons/edit.png")
                        }
                      />
                      <img
                        className=" deletePassword w-6 cursor-pointer "
                        src="/icons/bin.png"
                        alt=""
                        onClick={() => deletePassword(item._id)}
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/icons/bin.gif")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/icons/bin.png")
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}{" "}
          </tbody>
        </table>
        </>
      )}{" "}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full max-w-[450px] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 rounded-full p-1 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              >
                <CloseIcon />
                <span className="sr-only">Close</span>
              </button>
              <form onSubmit={handleSubmit} className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="url">
                    URL
                  </label>
                  <input
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300  "
                    defaultValue={form.url}
                    onChange={(e) => handleChange(e)}
                    name="url"
                    id="url"
                    type="text"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300  "
                    defaultValue={form.username}
                    onChange={(e) => handleChange(e)}
                    name="username"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300  "
                      defaultValue={form.password}
                      onChange={(e) => handleChange(e)}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-green-300"
                    type="submit"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default PasswordSection;
