"use client";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

enum VerifyEmailPageState {
    Verifying = "verifying",
    Error = "error",
    None = "none",
    Success = "success",
}

export default function VerifyEmail() {
    const router = useRouter();
    /**
     * The token extracted from the URL query string.
     */
    const [token, setToken] = useState("");
    const [pageState, setPageState] = useState<VerifyEmailPageState>(
        VerifyEmailPageState.None
    );
    const [message, setMessage] = useState("");

    const verifyEmail = async () => {
        try {
            setPageState(VerifyEmailPageState.Verifying);
            console.log(token);
            const res = await axios.post("/api/users/verifyemail", { token });
            console.log(res.data);
            if (res.data.success) {
                setPageState(VerifyEmailPageState.Success);
                router.push("/login");
            } else {
                setMessage(res.data.error);
                setPageState(VerifyEmailPageState.Error);
            }
        } catch (error) {
            setPageState(VerifyEmailPageState.Error);
            console.log(error);
        }
    };

    useEffect(() => {
        if (token && token.length > 0) {
            verifyEmail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        const token = window.location.search.split("=")[1];
        if (!token) {
            setPageState(VerifyEmailPageState.Error);
            setMessage(
                "No token found. Please check your email for the verification link."
            );
        } else {
            setToken(token);
        }
    }, []);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen  bg-gray-50 dark:bg-gray-900">
                {pageState === VerifyEmailPageState.None ? (
                    <></>
                ) : pageState === VerifyEmailPageState.Verifying ? (
                    <h5 className="text-xl font-medium animate-pulse text-gray-900 dark:text-white">
                        {" "}
                        Verifying ...{" "}
                    </h5>
                ) : pageState === VerifyEmailPageState.Success ? (
                    <h5 className="text-xl font-medium animate-pulse text-gray-900 dark:text-white"></h5>
                ) : (
                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            {pageState === VerifyEmailPageState.Error
                                ? "Some Error Occured"
                                : "Successfully Verified "}
                        </h5>
                        <div
                            className={`${
                                pageState == VerifyEmailPageState.Error
                                    ? "text-red-500"
                                    : "text-green-900 animate-bounce"
                            }  block mb-2 text-sm font-medium 
                        `}>
                            {pageState == VerifyEmailPageState.Error
                                ? message
                                : "Your email has been successfully verified."}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
