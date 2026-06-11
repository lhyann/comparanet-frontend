import { type ChangeEvent, useEffect, useState } from "react";

interface PlatformRangeSliderProps {
  minPlatforms: string;
  setMinPlatforms: (value: string) => void;
  maxPlatforms: string;
  setMaxPlatforms: (value: string) => void;
}

export default function PlatformRangeSlider({
  minPlatforms,
  setMinPlatforms,
  maxPlatforms,
  setMaxPlatforms,
}: PlatformRangeSliderProps) {
  const absoluteMin = 0;
  const absoluteMax = 10;

  const [minVal, setMinVal] = useState(minPlatforms ? Number(minPlatforms) : absoluteMin);
  const [maxVal, setMaxVal] = useState(maxPlatforms ? Number(maxPlatforms) : absoluteMax);

  useEffect(() => {
    if (!minPlatforms) setMinVal(absoluteMin);
    if (!maxPlatforms) setMaxVal(absoluteMax);
  }, [minPlatforms, maxPlatforms]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal);
    setMinVal(value);
    setMinPlatforms(value.toString());
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal);
    setMaxVal(value);
    setMaxPlatforms(value.toString());
  };

  const minPercent = (minVal / absoluteMax) * 100;
  const maxPercent = (maxVal / absoluteMax) * 100;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Plataformas de Streaming</h3>
      
      <div className="relative h-5 flex items-center mb-4">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full"></div>
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        ></div>
        
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
          [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-10"
        />
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
          [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-20"
        />
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-gray-700">
        <div className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
          {minVal} {minVal === 1 ? "plataforma" : "plataformas"}
        </div>
        <span className="text-gray-400">-</span>
        <div className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
          {maxVal} {maxVal === 1 ? "plataforma" : "plataformas"}
        </div>
      </div>
    </div>
  );
}