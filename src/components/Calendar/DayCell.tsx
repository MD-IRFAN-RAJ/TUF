import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { DayData } from '../../hooks/useCalendar';
import { cn } from '../../utils/cn';

interface DayCellProps {
  dayData: DayData;
  onClick: () => void;
}

export function DayCell({ dayData, onClick }: DayCellProps) {
  const {
    date,
    isCurrentMonth,
    isToday,
    isSelectedStart,
    isSelectedEnd,
    isWithinSelection,
    isSunday,
    isFriday,
    hasEvents,
    holiday
  } = dayData;

  const isSelected = isSelectedStart || isSelectedEnd;

  return (
    <div className="relative group cursor-pointer aspect-square sm:aspect-auto sm:min-h-[4.5rem] flex items-center justify-center p-1" onClick={onClick}>
      {/* Background fill for range - seamless connector */}
      {isWithinSelection && (
        <div className={cn(
          "absolute inset-y-2 bg-primary/20 z-0 transition-all duration-300",
          isSelectedStart && !isSelectedEnd ? "left-1/2 right-0 rounded-l-none" : 
          isSelectedEnd && !isSelectedStart ? "left-0 right-1/2 rounded-r-none" : 
          isSelectedStart && isSelectedEnd ? "left-1/2 right-1/2" : "left-0 right-0"
        )} />
      )}

      {/* Main Cell Content */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl text-sm font-medium transition-all duration-300 z-10",
          !isCurrentMonth && "opacity-20",
          !isSelected && !isWithinSelection && "hover:bg-white/5",
          !isSelected && !isWithinSelection && isSunday && "text-red-400 hover:text-red-300",
          !isSelected && !isWithinSelection && isFriday && "text-emerald-400 hover:text-emerald-300",
          !isSelected && !isWithinSelection && !isSunday && !isFriday && "text-white/60 hover:text-white",
          isWithinSelection && !isSelected && "text-primary font-bold",
          isSelected && "premium-gradient text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110",
          isToday && !isSelected && "border border-primary/40 text-primary shadow-[0_0_10px_rgba(59,130,246,0.2)]"
        )}
        title={holiday ? holiday.name : undefined}
      >
        {holiday && isCurrentMonth ? (
          <img
            src={holiday.imageUrl}
            alt={holiday.name}
            className="w-full h-full rounded-2xl object-cover"
          />
        ) : (
          <span className={cn(isSelected && "drop-shadow-md")}>{format(date, 'd')}</span>
        )}
        
        {hasEvents && isCurrentMonth && !isSelected && (
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
        )}

        {isToday && !isSelected && (
          <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary" />
        )}
      </motion.div>
    </div>
  );
}
