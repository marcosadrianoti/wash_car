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
    <button
      type="button"
      value={valueType}
      className={`flex flex-col h-40 w-40 items-center justify-center rounded-full p-5 bg-slate-300 hover:${isSelected ? '' : 'bg-slate-400'} ${isSelected ? 'bg-blue-300' : ''}`}
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
      <span
        className={`text-slate-800 ${isSelected ? 'text-white' : ''}`}>
        {buttonText}
      </span>
    </button>
  );
};

export default WashType;
