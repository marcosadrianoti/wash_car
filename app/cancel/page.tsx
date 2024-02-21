'use client'

import React from "react";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Success(req: Request) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  return (
    <>
      <section
        className="w-full min-h-screen items-center bg-auto bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: "url('/images/garage.png')", backgroundPosition: "center" }}
      >
        <div className="flex flex-col mt-10 items-center text-center text-white text-3xl p-5 w-full">
          <Image
            src='/images/cancell.png'
            alt="Cancel Icon"
            priority={true}
            width={80}
            height={80}
            className='w-auto h-auto'
          />
            <p className="p-3 w-full font-semibold">Something Went Wrong!!</p>
          <button
            type="button"
            className='p-4  mt-28 rounded-full bg-green-600 text-bg-color text-base font-medium'
            onClick={() => router.push(`/schedules?userId=${userId}`)}
          >
            Go My schedules
          </button>
        </div>
      </section>
    </>
  )
}
