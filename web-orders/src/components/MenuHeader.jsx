import React from 'react';
import { getCurrentMealTime } from '../utils/timeUtils';

export default function MenuHeader() {
  const mealTime = getCurrentMealTime();
  
  return (
    <div className="relative py-16 classic-pattern">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-amber-900 mb-4 tracking-tight">
          Hương Vị Việt Nam
        </h1>
        <p className="text-xl text-amber-800 font-medium italic">
          Perfect for {mealTime} - Authentic Vietnamese Cuisine
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-0.5 w-32 bg-amber-800 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}