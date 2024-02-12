'use client'

import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import WashTypeComponent from '@/components/WashType';
import { WashType } from '@/interfaces';

export default function Schedule() {
  const [currentWashType, setCurrentWashType] = useState({
    washTypeId: 0,
  });
  const [washTypes, setWashTypes] = useState<WashType[]>([]);
  const { user } = useUser();

  const handleWashTypeChange = (valueType: number): void => {
    setCurrentWashType({ ...currentWashType, washTypeId: valueType });

  };
  console.log(washTypes);

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
            isSelected={currentWashType.washTypeId === washType.id}
          />
        ))}
      </div>
      <select>
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
    </div>
  );
}
