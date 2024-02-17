// import Link from "next/link";
// import React from "react";
// import Image from 'next/image'

// export default function Login() {
//   return (
//     <>
//     <main className="flex min-h-screen justify-around items-center bg-stone-900 p-10">
//         <section
//           className="w-1/2 h-3/4 items-center bg-auto bg-center bg-no-repeat rounded-lg"
//           style={{backgroundImage: "url('/images/garage.png')" }}
//         >
//           <div className="flex flex-col items-center text-center text-white text-3xl p-5 w-full">
//             <p className="p-3 w-full">Welcome to Wash Car!</p>
//             <Link
//               className='m-5 mt-20 text-3xl font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-md p-1 shadow-xl' href='/api/auth/login'
//             >
//               Login
//             </Link>
//           </div>
//         </section>
//         {/* <section className="w-1/2 items-center text-center p-24 bg-slate-800">
//         </section> */}
//     </main>
//     </>
//   );
// };


import Link from "next/link";
import React from "react";
import Image from 'next/image'

export default function Login() {
  return (
    <>
    <main className="flex min-h-screen pt-1 items-center bg-slate-300 p-10">
        <section
          className="w-full min-h-screen items-center bg-auto bg-center bg-no-repeat rounded-lg"
          style={{backgroundImage: "url('/images/garage.png')",   backgroundPosition: "center" }}
        >
          <div className="flex flex-col mt-20 items-center text-center text-white text-3xl p-5 w-full">
            <Link
              className='mt-24 text-3xl font-bold text-white bg-pink-500 hover:bg-pink-600 rounded-md p-1 shadow-xl' href='/api/auth/login'
            >
              Login
            </Link>
            <p className="p-3 w-full font-semibold">Welcome to Wash Car!</p>
          </div>
        </section>
        {/* <section className="w-1/2 items-center text-center p-24 bg-slate-800">
        </section> */}
    </main>
    </>
  );
};
