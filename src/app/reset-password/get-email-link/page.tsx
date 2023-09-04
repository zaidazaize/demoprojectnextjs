"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

enum ResetLinkPageState {
    Error = "error",
    None = "none",
    Success = "success",
}
export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState("");
    const [pageState, setPageState] = useState<ResetLinkPageState>(
        ResetLinkPageState.None
    );

    useEffect(() => {
        if (email.length > 0 && email.includes("@") && email.includes(".")) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    const onResetPassword = async () => {
        try {
            setLoading(true);
            console.log(email);
            const res = await axios.post("/api/users/pw/gen-reset-link", {
                email: email,
            });
            console.log(res.data);
            if (res.data.success) {
                setError("");
                setPageState(ResetLinkPageState.Success);
            } else {
                setPageState(ResetLinkPageState.Error);
                setError(res.data.error);
            }
        } catch (error: any) {
            setPageState(ResetLinkPageState.Error);
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  bg-gray-50 dark:bg-gray-900">
            {pageState != ResetLinkPageState.None ? (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                        {pageState == ResetLinkPageState.Error
                            ? "Some Error Occured"
                            : "Password Reset Link Sent"}
                    </h5>
                    <div
                        className={`${
                            pageState == ResetLinkPageState.Error
                                ? "text-red-500"
                                : "text-green-900 animate-bounce"
                        }  block mb-2 text-sm font-medium 
                        `}>
                        {pageState == ResetLinkPageState.Error
                            ? error
                            : "A password reset link has been sent to your email address."}
                    </div>
                    <div>
                        Go to{" "}
                        <Link
                            className="text-blue-700 hover:underline dark:text-blue-500"
                            href={"/login"}>
                            Login
                        </Link>{" "}
                        page
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  ">
                    <div className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            {loading ? "Processing" : "Reset Password"}
                        </h5>
                        <p className="block animate-pulse mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fill up the form to reset the password
                        </p>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@domain.com"
                            />
                        </div>

                        <button
                            disabled={buttonDisabled}
                            onClick={onResetPassword}
                            className={`w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                buttonDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 m-1">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                />
                            </svg>

                            <span>
                                {loading ? (
                                    <>
                                        Processing{" "}
                                        <div className="animate-pulse text-white inline">
                                            ...
                                        </div>
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </span>
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered yet ?{" "}
                            <Link
                                href={"/signup"}
                                className="text-blue-700 hover:underline dark:text-blue-500">
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
