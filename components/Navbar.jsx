"use client";
import Link from 'next/link'
import React from 'react'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
const Navbar = () => {
    const {data: session}  = useSession();
    return (

        <nav className='bg-slate-800   text-white'>
            <div className="md:mycontainer py-5 px-4 flex items-center  justify-between ">
                <Link href={"/"}
                    className="logo font-bold text-2xl">
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>Op/&gt;</span>
                </Link>
                <ul>
                    <li className='flex gap-6 items-center justify-center'>
                        {/* <Link className='hover:cursor-pointer hover-bold' href="/register">Sign In
                        </Link> */}
                        <div class="relative ml-3">

                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0}
                                    role="button"
                                    className=" relative flex rounded-full bg-gray-800 text-sm focus:outline-nonefocus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                </div>
                                <ul tabIndex={0}
                                    className="dropdown-content  menu p-2    absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <li>
                                        <a href="/dashboard" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Dashboard</a>
                                    </li>
                                    <li>
                                        <button  onClick={() => signOut()}  className={`block px-4 py-2 text-sm text-gray-700 ` + (session ? "" : "hidden")} role="menuitem" tabindex="-1" id="user-menu-item-0">Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <img className='invert w-8 cursor-pointer' src="/icons/github.svg" alt="" /> */} </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
