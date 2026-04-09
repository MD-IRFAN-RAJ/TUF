import type { DayData } from '../../hooks/useCalendar';
import { DayCell } from './DayCell';

interface DayGridProps {
  days: DayData[];
  onDayClick: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function DayGrid({ days, onDayClick }: DayGridProps) {
  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-4">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className={`text-center text-sm font-medium pb-2 ${
              day === 'Sun'
                ? 'text-red-400'
                : day === 'Fri'
                ? 'text-emerald-400'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-x-2">
        {days.map((dayData) => (
          <DayCell 
            key={dayData.date.toISOString()}
            dayData={dayData}
            onClick={() => onDayClick(dayData.date)}
          />
        ))}
      </div>
    </div>
  );
}
