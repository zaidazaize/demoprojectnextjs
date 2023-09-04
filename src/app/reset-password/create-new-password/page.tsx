"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import Link from "next/link";

enum PageState {
    // Resetting = "resetting",
    Error = "error",
    None = "none",
    Success = "success",
}

export default function ResetPassword({ params }: any) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passowrdError, setPasswordError] = useState("");
    const [message, setMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [pageState, setPageState] = useState<PageState>(PageState.None);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (password.length > 0 && confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [password, confirmPassword]);

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const responce = await axios.post("/api/users/pw/vres-pass-tk", {
                password,
                confirmPassword,
                resetToken: params.resetToken,
            });
            if (responce.data.success) {
                setPageState(PageState.Success);
                router.push("/login");
            } else {
                setPageState(responce.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     if (token && token.length > 0) {
    //         resetPassword();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [token]);

    useEffect(() => {
        const token = window.location.search.split("=")[1];
        if (!token || token.length == 0) {
            setPageState(PageState.Error);
            setMessage(
                "No token found. Please check your email for the reset link."
            );
        } else {
            setToken(token);
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen max-h-screen bg-gray-50 dark:bg-gray-900">
            {pageState === PageState.None ? (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                    <div className="space-y-6">
                        <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Reset Password
                        </h5>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                New password
                            </label>
                            <input
                                type="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="New Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm new password
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                type="password"
                                placeholder="Confirm New Password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            {passowrdError !== "" ? (
                                <div className="text-red-500 text-sm font-medium">
                                    {passowrdError}
                                </div>
                            ) : (
                                <></>
                            )}
                            <button
                                disabled={buttonDisabled}
                                className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                    buttonDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                } ${loading ? "animate-pulse" : ""}}`}
                                onClick={resetPassword}>
                                {loading ? "Processing" : "Reset Password"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {pageState === PageState.Error
                            ? "Some Error Occured"
                            : "Successfully Verified "}
                    </h5>
                    <div
                        className={`${
                            pageState == PageState.Error
                                ? "text-red-500 animate-pulse"
                                : "text-green-900 animate-bounce"
                        }  block mb-2 text-sm font-medium 
                        `}>
                        {message}
                    </div>
                    <p>
                        Go to{" "}
                        <Link
                            href="/login"
                            className="text-blue-700 hover:underline">
                            Login{" "}
                        </Link>
                        Page
                    </p>
                </div>
            )}
        </div>
    );
}
