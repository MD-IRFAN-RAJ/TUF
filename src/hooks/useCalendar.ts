import { useState, useMemo } from 'react';
import { 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  isBefore,
  format
} from 'date-fns';

type HolidayInfo = {
  name: string;
  imageUrl: string;
};

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isWithinSelection: boolean;
  isSunday: boolean;
  isFriday: boolean;
  hasEvents: boolean;
  holiday?: HolidayInfo;
}

const HOLIDAYS_BY_MM_DD: Record<string, HolidayInfo> = {
  '01-01': {
    name: 'New Year\'s Day',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80'
  },
  '07-04': {
    name: 'Holiday',
    imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=300&q=80'
  },
  '12-25': {
    name: 'Christmas',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=300&q=80'
  }
};

export function useCalendar(eventDateKeys?: Set<string>) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [monthDirection, setMonthDirection] = useState<1 | -1>(1);

  const nextMonth = () => {
    setMonthDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setMonthDirection(-1);
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = eachDayOfInterval({
      start: startDate,
      end: endDate
    });

    const today = new Date();

    return dateFormat.map((date): DayData => {
      const isStart = selectionStart ? isSameDay(date, selectionStart) : false;
      const isEnd = selectionEnd ? isSameDay(date, selectionEnd) : false;
      
      let isWithin = false;
      if (selectionStart && selectionEnd) {
        // Handle reverse selection
        const start = isBefore(selectionStart, selectionEnd) ? selectionStart : selectionEnd;
        const end = isBefore(selectionStart, selectionEnd) ? selectionEnd : selectionStart;
        isWithin = isWithinInterval(date, { start, end });
      }

      return {
        date,
        isCurrentMonth: isSameMonth(date, monthStart),
        isToday: isSameDay(date, today),
        isSelectedStart: isStart,
        isSelectedEnd: isEnd,
        isWithinSelection: isWithin,
        isSunday: date.getDay() === 0,
        isFriday: date.getDay() === 5,
        hasEvents: eventDateKeys ? eventDateKeys.has(format(date, 'yyyy-MM-dd')) : false,
        holiday: HOLIDAYS_BY_MM_DD[format(date, 'MM-dd')]
      };
    });
  }, [currentMonth, selectionStart, selectionEnd, eventDateKeys]);

  const handleDayClick = (date: Date) => {
    if (!selectionStart || (selectionStart && selectionEnd)) {
      // Start a new selection
      setSelectionStart(date);
      setSelectionEnd(null);
    } else {
      // Complete the selection
      setSelectionEnd(date);
    }
  };

  return {
    currentMonth,
    monthDirection,
    days,
    nextMonth,
    prevMonth,
    handleDayClick,
    selectionStart,
    selectionEnd
  };
}
