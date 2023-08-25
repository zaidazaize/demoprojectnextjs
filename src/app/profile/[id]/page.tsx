"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UserProfile({ params }: any) {
    const router = useRouter();
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

    return (
        <div className="  flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl  ">Profile page{params.id}</p>
            <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg py-2 px-2 mt-4">
                Logout
            </button>
        </div>
    );
}
