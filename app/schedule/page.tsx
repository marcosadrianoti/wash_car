'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import WashTypeComponent from '@/components/WashType';
import { WashType, City } from '@/interfaces';
import { MdCalendarMonth, MdEmail, MdLocationCity, MdMessage, MdOutlineSchedule, MdPersonPin } from "react-icons/md";
import Logout from "@/components/Logout";
import Link from "next/link";

export default function Schedule(req: Request) {
  const searchParams = useSearchParams()

  const [newSchedule, setNewSchedule] = useState({
    userId: "",
    washTypeId: 0,
    cityId: 0,
    message: "",
    scheduledDate: "",
    payment: false
  });
  const [washTypes, setWashTypes] = useState<WashType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [washTypeIdError, setWashTypeIdError] = useState(null);
  const [cityIdError, setCityIdError] = useState(null);
  const [scheduledDateError, setScheduledDateError] = useState('');

  const sub = searchParams.get('sub') || '';
  const user = useUser().user;

  const handleWashTypeChange = (valueType: number): void => {
    setNewSchedule({ ...newSchedule, washTypeId: valueType });
    setWashTypeIdError(null);
  };

  const handleCityChange = (event: { target: { value: string; }; }) => {
    const valueId = parseInt(event.target.value);
    const cityId = Number.isNaN(valueId) ? 0 : valueId;
    setNewSchedule({ ...newSchedule, cityId });
    setCityIdError(null);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString(); // Converte a data para o formato ISO 8601
      setNewSchedule({ ...newSchedule, scheduledDate: formattedDate })
      setScheduledDateError('');
    }
  }

  const handleMessageChange = (event: { target: { value: string; }; }) => {
    const message = event.target.value
    setNewSchedule({ ...newSchedule, message })
  }


  const handleErrors = (errors: any[]) => {
    errors.forEach(error => {
      const key = Object.keys(error)[0];
      const errorMessage = error[key];

      switch (key) {
        case 'washTypeIdError':
          setWashTypeIdError(errorMessage);
          break;
        case 'cityIdError':
          setCityIdError(errorMessage);
          break;
        case 'scheduledDateError':
          setScheduledDateError(errorMessage);
          break;
        default:
          break;
      }
    });
  }

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `/api/schedule`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSchedule)
        }
      );
      const { message, status } = await res.json();
      if (status === 400) {
        handleErrors(message);
      } else if (status === 201) {
        setNewSchedule(prevSchedule => ({
          ...prevSchedule,
          washTypeId: 0,
          cityId: 0,
          message: "",
          scheduledDate: "",
          payment: false
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user?sub=${sub}`);
        const responseData = await res.json();
        if (responseData.status === 200) {
          const userId = responseData.message.id;
          setNewSchedule(prevSchedule => ({ ...prevSchedule, userId }));
        } else {
          throw new Error('Error when searching for user');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [sub]);

  useEffect(() => {
    async function fetchWashTypes() {
      try {
        const res = await fetch(`/api/wash-types`);
        if (res.ok) {
          const responseData = await res.json();
          const allWashTypes: WashType[] = responseData.message;
          setWashTypes(allWashTypes);
        } else {
          throw new Error('Error when searching for wash types');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchWashTypes();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`/api/cities`);
        if (res.ok) {
          const responseData = await res.json();
          const allCities: City[] = responseData.message;
          setCities(allCities);
        } else {
          throw new Error('Error when searching for cities');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCities();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center mt-5 bg-slate-200 rounded-lg w-2/3">
      <div className="flex flex-row justify-between w-full">
        <div className="w-1/3"></div>
        <div className="flex flex-col items-center text-center m-2 text-blue-950 w-full">
          <h1 className="text-3xl font-bold">Book a wash for your CAR</h1>
          <h3 className="text-xl text-blue-900">Fully automated services with all cleaning options</h3>
        </div>
        <div className='flex flex-row-reverse gap-2 mt-1 mr-3 justify-end items-start w-1/3 text-sm text-blue-500'>

          <Logout />
          <Link
            className='hover:text-blue-700'
            href={`/schedules?userId=${newSchedule.userId}`}
          >
            My Schedules
          </Link>
        </div>
      </div>
      <form className="flex flex-col" id="formSchedule" onSubmit={handleSubmit}>
        <div className='flex gap-4 p-4'>
          {washTypes.map(washType => (
            <WashTypeComponent
              key={washType.id}
              svgImage={`/images/${washType.type.toLowerCase().replace(' ', '_')}.svg`}
              buttonText={washType.type}
              valueType={washType.id}
              onClick={handleWashTypeChange}
              isSelected={newSchedule.washTypeId === washType.id}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <p id="washTypeIdError" className="bg-red-100 text-red-500 px-5 text-center w-full">{washTypeIdError}</p>
        </div>
        <div>
          <div className="flex p-2 justify-items-start gap-10">
            <label className="w-1/2">
              <div className="flex gap-2 items-center">
                <MdPersonPin className="text-blue-900" />
                Name
              </div>
              <p className="flex gap-2 items-center text-blue-900">{user?.name}</p>
            </label>
            <label className="w-1/2">
              <div className="flex gap-2 items-center">
                <MdEmail className="text-blue-900" />
                Email
              </div>

              <p className="flex gap-2 items-center text-blue-900">{user?.email}</p>
            </label>
          </div>
          <div className="flex p-2 justify-items-start gap-10">
            <label className="flex flex-col w-1/2">
              <div className="flex gap-2 items-center">
                <MdLocationCity className="text-blue-900" />
                Select a City
              </div>

              <select
                name="cityId"
                onChange={handleCityChange}
                value={newSchedule.cityId}
                className="text-blue-900 p-1 rounded-md bg-white shadow-xl">
                <option defaultValue={0}></option>
                {cities
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
              </select>
              <p id="cityIdError" className="bg-red-100 text-red-500 px-5 text-center">{cityIdError}</p>
            </label>
            <label className="flex flex-col w-1/2">
              <div className="flex gap-2 items-center">
                <MdCalendarMonth className="text-blue-900" />
                Select a date and time
              </div>
              <DatePicker
                selected={newSchedule.scheduledDate ? new Date(newSchedule.scheduledDate) : null}
                onChange={(date) => handleDateChange(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy hh:mm aa"
                className="text-blue-900 p-1 rounded-md shadow-xl"
                id="washDate"
              />
              <p id="scheduledDateError" className="bg-red-100 text-red-500 px-5 text-center">{scheduledDateError}</p>
            </label>
          </div>
          <label className="flex flex-col mt-2">
            <div className="flex gap-2 items-center">
              <MdMessage className="text-blue-900" />
              Additional message
            </div>
            <textarea
              id="messageWash"
              className="text-blue-900 caret-blue-900 p-1 rounded-md shadow-xl"
              value={newSchedule.message}
              onChange={handleMessageChange}
            />
          </label>
        </div>
        <div className="flex justify-center m-5">
          <button
            type="submit"
            className="flex gap-2 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-xl"
          >
            <MdOutlineSchedule />
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
