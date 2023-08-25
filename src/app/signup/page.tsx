"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
                id="userName"
                type="text"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="">Email</label>
            <input
                className="border p-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onSignup}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {buttonDisabled ? "Disabled" : "Signup"}
            </button>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 " href={"/login"}>
                Visit Login
            </Link>
        </div>
    );
}
