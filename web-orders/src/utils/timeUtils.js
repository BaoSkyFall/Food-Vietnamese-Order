export function getCurrentMealTime() {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 14) return 'lunch';
  if (hour >= 14 && hour < 17) return 'afternoon snack';
  if (hour >= 17 && hour < 22) return 'dinner';
  return 'late night meal';
}