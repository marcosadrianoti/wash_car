'use client'

import { Schedule } from "@/interfaces";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'

export default function Schedules(req: Request) {
  const [mySchedules, setMySchedules] = useState<Schedule[]>([]);
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || '';

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`/api/schedule?userId=${userId}`);
        const schedules = await res.json();
        setMySchedules(schedules.message);
      } catch (error) {
        console.error('Erro ao buscar schedules:', error);
      }
    };

    fetchSchedules();
  }, [userId]);

  const handleDelete = (id: number) => {
  };

  const handlePay = (id: number) => {
  };

  return (
    <main className="flex min-h-screen justify-around items-center bg-slate-300">
      <div className="flex flex-col min-h-screen items-center mt-5 bg-slate-200 rounded-lg w-2/3">
        <h3 className="text-xl text-blue-900">My Schedules</h3>
        <h3>{mySchedules.length > 0 && mySchedules[0].user?.name}</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Wash Type</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Scheduled Date</th>
              <th className="py-2 px-4">Paid</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mySchedules.map((schedule, index) => (
              <tr key={schedule.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="py-2 px-4 text-xs">{schedule.washType?.type}</td>
                <td className="py-2 px-4 text-xs">{schedule.city?.name}</td>
                <td className="py-2 px-4 text-xs">{schedule.message}</td>
                <td className="py-2 px-4 text-xs">{schedule.washType?.price}</td>
                <td className="py-2 px-4 text-xs">{new Date(schedule.scheduledDate).toLocaleDateString()}{new Date(schedule.scheduledDate).getHours()}:{new Date(schedule.scheduledDate).getMinutes()}</td>
                <td className="py-2 px-4 text-xs">{schedule.payment ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 text-xs">
                  <button className="mr-2 bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(schedule.id)}>Delete</button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handlePay(schedule.id)}>Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
