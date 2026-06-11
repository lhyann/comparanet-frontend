import { type ChangeEvent, useEffect, useState } from "react";

interface PriceRangeSliderProps {
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
}

export default function PriceRangeSlider({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: PriceRangeSliderProps) {
  const absoluteMin = 0;
  const absoluteMax = 100000; // precio max
  const step = 1000;

  const [minVal, setMinVal] = useState(minPrice ? Number(minPrice) : absoluteMin);
  const [maxVal, setMaxVal] = useState(maxPrice ? Number(maxPrice) : absoluteMax);

  // sincronizar
  useEffect(() => {
    if (!minPrice) setMinVal(absoluteMin);
    if (!maxPrice) setMaxVal(absoluteMax);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(value);
    setMinPrice(value.toString());
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(value);
    setMaxPrice(value.toString());
  };

  // colorizar
  const minPercent = ((minVal - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
  const maxPercent = ((maxVal - absoluteMin) / (absoluteMax - absoluteMin)) * 100;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Rango de Precio</h3>
      
      <div className="relative h-5 flex items-center mb-4">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full"></div>
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        ></div>
        
        {/* izquierda */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
          [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-10"
        />
        {/* derecha */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
          [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-20"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
          <span className="text-gray-500 mr-1">$</span>
          <input
            type="number"
            value={minVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMinVal(val);
            }}
            onBlur={(e) => {
              let val = Number(e.target.value);
              val = Math.max(absoluteMin, Math.min(val, maxVal - step));
              setMinVal(val);
              setMinPrice(val.toString());
            }}
            className="w-16 bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
          <span className="text-gray-500 mr-1">$</span>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMaxVal(val);
            }}
            onBlur={(e) => {
              let val = Number(e.target.value);
              val = Math.min(absoluteMax, Math.max(val, minVal + step));
              setMaxVal(val);
              setMaxPrice(val.toString());
            }}
            className="w-16 bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}