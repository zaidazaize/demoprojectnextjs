"use client";
import User from "@/models/userModel";
import { NetworkUser } from "@/models/utilModels/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
    const router = useRouter();

    // const [user, setUser] = React.useState<NetworkUser>();

    const goToUserProfile = async () => {
        try {
            const userData: any = await axios.get("api/users/me");
            console.log("profile page ", userData);
            // setUser(userData.data.user);
            router.push(`/profile/${userData.data.user.userName}`);
        } catch (error) {
            console.log(error);
        }
    };

    // React.useEffect(() => {
    //      loadUser();
    // }, []);
    const onLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            if (response.data.success) {
                router.push("/login");
            } else {
                console.log("logout failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile</h1>
            <hr />
            <button
                className="bg-blue-500 px-2 mt-2 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mb-2"
                onClick={goToUserProfile}
            >
                View Profile
            </button>
            <button
                onClick={onLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
            >
                Logout
            </button>
        </div>
    );
}
