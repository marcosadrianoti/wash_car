// import { Schedule } from "@/interfaces";
// import { useState } from "react";

// export default function Schedules(req: Request) {
//   const [mySchedules, setMySchedules] = useState<Schedule[]>([]); // mySchedules

//   return (
//     <main className="flex min-h-screen justify-around items-center bg-slate-300">
//       <div className="flex flex-col min-h-screen items-center mt-5 bg-slate-200 rounded-lg w-2/3">
//         <div className="flex flex-row justify-between w-full">
//           <h3 className="text-xl text-blue-900">My Schedules</h3>
//           {mySchedules
//             .map(schedule => (
//               <div key={schedule.id}>
//                 <h3>{schedule.washTypeId</h3>
//                 <h3>{schedule.city}</h3>
//                 <h3>{schedule.message}</h3>
//                 <h3>{schedule.sheduled_date}</h3>
//               </div>
//             ))}
//         </div>
//       </div>
//     </main>
//   )
// }
'use client'

import { Schedule, WashType, User, City } from "@/interfaces";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { getAllSchedulesByUserIdController } from "@/controllers";
// import { useUser } from '@auth0/nextjs-auth0/client';

export default function Schedules(req: Request) {
  const [mySchedules, setMySchedules] = useState<Schedule[]>([]); // mySchedules
  // const user = useUser().user;
  // const userId = user?.id || '';
  const searchParams = useSearchParams()
  // const { searchParams } = new URL(req.url)
  // const sub = searchParams.get('sub') || '';
  const userId = searchParams.get('userId') || '';

  useEffect(() => {
    // Função para buscar e definir os schedules
    const fetchSchedules = async () => {
      console.log('userId', userId);

      try {
        const res = await fetch(`/api/schedule?userId=${userId}`);
        const schedules = await res.json();
        console.log('schedules', schedules);

        // const schedules = await getAllSchedulesByUserIdController(userId); // Supondo que você tenha o userId definido em algum lugar
        setMySchedules(schedules.message);
      } catch (error) {
        console.error('Erro ao buscar schedules:', error);
      }
    };

    fetchSchedules(); // Chamada da função ao montar o componente

    // Lembre-se de limpar o efeito se necessário
    return () => {
      // Código para limpar o efeito, se necessário
    };
  }, [userId]); // Dependência vazia para garantir que seja chamado apenas uma vez

  return (
    <main className="flex min-h-screen justify-around items-center bg-slate-300">
      <div className="flex flex-col min-h-screen items-center mt-5 bg-slate-200 rounded-lg w-2/3">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-xl text-blue-900">My Schedules</h3>
          <div className="flex flex-col">
            {mySchedules.map(schedule => (
              <div key={schedule.id}>
                <h3>{schedule.washType?.name}</h3>
                {/* <h3>{schedule.user.name}</h3>
              <h3>{schedule.city.name}</h3> */}
                <h3>{schedule.message}</h3>
                <h3>{schedule.scheduledDate}</h3> {/* Usei o nome exato do campo fornecido em sua estrutura */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
