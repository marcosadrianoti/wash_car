import React from 'react';
import Image from 'next/image';

type WashTypeProps = {
  buttonText: string;
  svgImage: string;
  valueType: number;
  onClick: (valueType: number) => void;
  isSelected: boolean;
};

const WashType: React.FC<WashTypeProps> = ({ buttonText, svgImage, valueType, onClick, isSelected }) => {

  return (
    <div className='flex flex-col items-center gap-3'>
      <button
        type="button"
        value={valueType}
        className={`flex flex-col h-40 w-40 items-center justify-center shadow-xl rounded-full p-5 bg-blue-100 ${isSelected ? 'bg-sky-600' : ''} ${isSelected ? '' : 'hover:bg-blue-400'}`}
        onClick={() => onClick(valueType)}
      >
        <Image
          src={svgImage}
          alt="Icon"
          priority={true}
          width={100}
          height={100}
          className='w-auto h-auto'
        />
      </button>
      <span
        className={`${isSelected ? 'text-xl font-medium text-blue-900' : ''}`}
      >
        {buttonText}
      </span>
    </div>
  );
};

export default WashType;
