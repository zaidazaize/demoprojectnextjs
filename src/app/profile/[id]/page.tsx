"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

export default function UserProfile() {
    const router = useRouter();
    // const dialogref = useRef<HTMLDialogElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const onLogout = async () => {
        try {
            const responce = await axios.get("/api/users/logout");
            if (responce.data.success) {
                router.push("/login");
            } else {
                console.log("logout failed");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const toggleDialog = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen max-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                    <button
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                        type="button">
                        <span className="sr-only">Open dropdown</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                    <div
                        id="dropdown"
                        className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center pb-10">
                    {/* <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src="/docs/images/people/profile-picture-3.jpg"
                        alt="Bonnie image"
                    /> */}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Visual Designer
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <button
                            onClick={onLogout}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Logout
                        </button>
                        <Link
                            href={"/reset-password/get-email-link"}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Reset Password
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
