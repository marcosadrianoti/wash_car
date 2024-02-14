'use client'

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import WashTypeComponent from '@/components/WashType';
import { WashType, City } from '@/interfaces';

export default function Schedule() {
  const [newSchedule, setNewSchedule] = useState({
    userId: "cls9g3sy000006nianvw3obq7",
    washTypeId: 0,
    cityId: 0,
    message: "Apenas um testeeeee",
    scheduledDate: "",
    payment: false
  });
  const [washTypes, setWashTypes] = useState<WashType[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const { user } = useUser();

  const handleWashTypeChange = (valueType: number): void => {
    setNewSchedule({ ...newSchedule, washTypeId: valueType });
  };

  const handleCityChange = (event: { target: { value: string; }; }) => {
    const valueId = parseInt(event.target.value);
    const cityId = Number.isNaN(valueId) ? 0 : valueId;
    setNewSchedule({ ...newSchedule, cityId });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString(); // Converte a data para o formato ISO 8601
      setNewSchedule({ ...newSchedule, scheduledDate: formattedDate })
    }
  }

  const handleMessageChange = (event: { target: { value: string; }; }) => {
    const message = event.target.value
    setNewSchedule({ ...newSchedule, message })
  }

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
    <div>
      <span>{user?.nickname} entrou.</span>
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

      <label className="flex flex-col">
        Select a City
        <select onChange={handleCityChange} className="text-blue-900 w-1/2">
          <option key='' value=''></option>
          {cities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
        </select>

      </label>
      <DatePicker
        selected={newSchedule.scheduledDate ? new Date(newSchedule.scheduledDate) : null}
        onChange={(date) => handleDateChange(date)}
        showTimeSelect
        dateFormat="dd/MM/yyyy hh:mm aa"
        className="w-3/4 text-blue-900"
        id="washDate"
        placeholderText="Choose a date and time"
      />
      <label className="flex flex-col">
        Additional message
        <textarea
          className="text-blue-900 w-1/2"
          value={newSchedule.message}
          onChange={handleMessageChange}
        />
      </label>
      <button onClick={() => console.log(newSchedule)} className=
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Agendar
      </button>
    </div>
  );
}
