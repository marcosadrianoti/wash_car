'use client'

import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import WashTypeComponent from '@/components/WashType';
import { WashType, City } from '@/interfaces';

export default function Schedule() {
  const [newSchedule, setNewSchedule] = useState({
    washTypeId: 0,
    cityId: 0,
  });
  const [washTypes, setWashTypes] = useState<WashType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const { user } = useUser();

  const handleWashTypeChange = (valueType: number): void => {
    setNewSchedule({ ...newSchedule, washTypeId: valueType });
  };

  const handleCityChange = (event: { target: { value: string; }; }) => {
    const idCity = parseInt(event.target.value);
    if (!Number.isNaN(idCity)) {
      setNewSchedule({...newSchedule, cityId: idCity});
      
    }
  };

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
  console.log('value====>', newSchedule);
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
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
