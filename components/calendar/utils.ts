"use client"

const getSubjectColor = (subject: string): string => {
  const hash = subject.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 75%, var(--subject-bg-lightness, 95%))`
}

const getStartOfWeek = () => {
  const today = new Date();
  
  const format = new Intl.DateTimeFormat(navigator.language, { weekday: 'long' });
  const firstDayName = format.formatToParts(new Date(2021, 0, 4)).find(p => p.type === 'weekday')?.value;
  const firstDayOfWeek = firstDayName?.toLowerCase() === 'monday' ? 1 : 0;
  
  const startOfWeek = new Date(today);
  const currentDay = today.getDay();
  const diff = currentDay >= firstDayOfWeek ? 
    currentDay - firstDayOfWeek : 
    7 - (firstDayOfWeek - currentDay);
  
  startOfWeek.setDate(today.getDate() - diff);
  return startOfWeek;
}

const getCurrentWeekDays = () => {
  const startOfWeek = getStartOfWeek();
  const days: { date: Date; weekday: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push({
      date: day,
      weekday: day.toLocaleDateString(navigator.language, { weekday: 'long' })
    });
  }
  return days;
};

export { getSubjectColor, getCurrentWeekDays, getStartOfWeek }