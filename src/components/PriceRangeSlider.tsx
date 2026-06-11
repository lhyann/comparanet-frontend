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
        {/* 背景轨道 */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full"></div>
        {/* 激活轨道 (蓝色) */}
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        ></div>
        
        {/* 左滑块 */}
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
        {/* 右滑块 */}
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
        <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
          ${minVal.toLocaleString("es-CL")}
        </div>
        <span className="text-gray-400">-</span>
        <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
          ${maxVal.toLocaleString("es-CL")}
        </div>
      </div>
    </div>
  );
}