"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";

export default function PaymentFail() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Head>
        <title>Payment Failed</title>
      </Head>
      <div
        className="bg-white rounded-lg p-8 shadow-md text-center"
        style={{ maxWidth: "400px" }}
      >
        <div className="text-red-500 text-5xl mb-4">
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-3">
          Sorry, the payment was not successful.
        </p>
        <p className="mb-3">
          <strong>Please try again later or contact support.</strong>
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
