'use client'

import React, { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import WashType from '@/components/WashType';

export default function Schedule() {
  const [values, setValues] = useState({
    washTypeId: 0,
  });
  const { user } = useUser();
  const handleWashTypeChange = (valueType: number): void => {
    setValues({...values, washTypeId: valueType});
    console.log('washTypeId', valueType);
  };

  return (
    <div>
      <span>{user?.name} entrou.</span>
      <div className='flex gap-4 p-4'>
        <WashType 
          svgImage='/images/tunnel_wash.svg'
          buttonText='Tunnel Wash'
          valueType={1}
          onClick={handleWashTypeChange}
          isSelected={values.washTypeId === 1}
        />
        <WashType
          svgImage='/images/self_wash.svg'
          buttonText='Self Wash'
          valueType={2}
          onClick={handleWashTypeChange}
          isSelected={values.washTypeId === 2}
        />
        <WashType
          svgImage='/images/chemical_wash.svg'
          buttonText='Chemical Wash'
          valueType={3}
          onClick={handleWashTypeChange}
          isSelected={values.washTypeId === 3}
        />
        <WashType
          svgImage='/images/hand_wash.svg'
          buttonText='Hand Wash'
          valueType={4}
          onClick={handleWashTypeChange}
          isSelected={values.washTypeId === 4}
        />
      </div>
    </div>
  );
}
