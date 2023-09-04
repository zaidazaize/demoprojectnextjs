"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        userName: "",
        password: "",
        email: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (user.userName && user.password && user.email) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log(res.data);
            router.push("/login");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen  bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                <div className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {loading ? "Processing" : "SignUp"}
                    </h5>
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your username
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="userNmae"
                            type="text"
                            value={user.userName}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    userName: e.target.value,
                                })
                            }
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="email@domain.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your password
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                            placeholder="Password"
                        />
                    </div>
                    <button
                        disabled={buttonDisabled}
                        onClick={onSignup}
                        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                            buttonDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}>
                        {loading ? (
                            <>
                                Processing{" "}
                                <div className="animate-pulse text-white inline">
                                    ...
                                </div>
                            </>
                        ) : (
                            "Signup"
                        )}
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account ?{" "}
                        <Link
                            href={"/login"}
                            className="text-blue-700 hover:underline dark:text-blue-500">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
