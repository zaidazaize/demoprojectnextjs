"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SigninUser } from "@/models/utilModels/types";
import { toast } from "react-hot-toast";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        password: "",
        email: "",
    });
    const onLogin = async () => {
        try {
            const res = await axios.post("/api/users/login", user);
            if (res.data) {
                toast.success("Login Success",{duration:2000});

                router.push("/profile");
            }
            console.log("datagot",res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="  flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Login</h1>

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="">Email</label>
            <input
                className="border p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
                Login
            </button>
            <Link className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg mt-4" href={"/signup"}>
                SignUp Now
            </Link>
        </div>
    );
}
