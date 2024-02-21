import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <>
      <section
        className="w-full min-h-screen items-center bg-auto bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: "url('/images/garage.png')", backgroundPosition: "center" }}
      >
        <div className="flex flex-col mt-20 items-center text-center text-white text-3xl p-5 w-full">
          <Link
            className='p-3 text-3xl font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-xl' href='/api/auth/login'
          >
            Login
          </Link>
          <p className="p-3 w-full font-semibold">Welcome to Wash Car!</p>
        </div>
      </section>
    </>
  );
};
