"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Success() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Head>
        <title>Payment Success</title>
      </Head>
      <div
        className="bg-white rounded-lg p-8 shadow-md text-center"
        style={{ maxWidth: "400px" }}
      >
        <div className="text-green-500 text-5xl mb-4">
          <svg
            className="w-16 h-16 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-3">Thank you for your payment!</p>
        <p className="mb-3">
          <strong>Have A Nice Day!</strong>
        </p>
        <a href="/">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Back To Website
          </button>
        </a>
      </div>
    </div>
  );
}
