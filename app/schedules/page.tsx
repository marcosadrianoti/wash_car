'use client'

import { Schedule } from "@/interfaces";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { MdDeleteForever, MdOutlinePayment } from "react-icons/md";

export default function Schedules(req: Request) {
  const [mySchedules, setMySchedules] = useState<Schedule[]>([]);
  const searchParams = useSearchParams();
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

  const handlePay = async (id: number, washType: string, price: number) => {
    console.log('ID:', id, 'Wash Type:', washType, 'Price:', price);
    const washTypeFileName = washType.toLowerCase().replace(/\s+/g, '_');

    const imageURL = `https://raw.githubusercontent.com/marcosadrianoti/wash_car/main/public/images/${washTypeFileName}.svg`;

    const items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: washType,
            images: [imageURL],
          },
          unit_amount: price * 100, // Convertendo para centavos
        },
        quantity: 1,
        schedule_id: id,
      },
    ];

    try {
      const res = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((url) => {
          location.href = url;
        })
        .catch((err) => console.log(err));
  

      // if (res.ok) {
      //   // Atualizar o estado de mySchedules para refletir a alteração de pagamento
      //   const updatedSchedules = mySchedules.map(schedule => {
      //     if (schedule.id === id) {
      //       return { ...schedule, payment: true };
      //     }
      //     return schedule;
      //   });
      //   setMySchedules(updatedSchedules);
      // } else {
      //   console.error('Erro ao processar pagamento:', res.statusText);
      // }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  };

  return (
    <main className="flex min-h-screen justify-around items-center bg-slate-300">
      <div className="flex flex-col min-h-screen items-center mt-5 bg-slate-200 rounded-lg w-2/3">
        <h1 className="text-xl text-blue-900">My Schedules</h1>
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
                <td className="flex py-2 px-2 gap-1 text-xs">
                  <button
                    className="flex gap-1 items-center bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(schedule.id)}
                  >
                    <MdDeleteForever />Delete
                  </button>
                  <button
                    className="flex gap-1 items-center bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handlePay(schedule.id, schedule.washType?.type ?? '', schedule.washType?.price ?? 0)}
                    disabled={schedule.payment}
                  >
                    <MdOutlinePayment />Pay
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

