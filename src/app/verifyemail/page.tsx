"use client";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmail({ request }: { request: NextRequest }) {
    const router = useRouter();
    /**
     * The token extracted from the URL query string.
     */
    const [token, setToken] = useState("");

    const verifyEmail = async () => {
        try {
            console.log(token);
            const res = await axios.post("/api/users/verifyemail", { token });
            console.log(res.data);
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    useEffect(() => {
        const token = window.location.search.split("=")[1];
        setToken(token);
    }, []);

    return <>Email varified</>;
}
