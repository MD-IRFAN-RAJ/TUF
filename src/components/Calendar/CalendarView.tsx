import type { useCalendar } from '../../hooks/useCalendar';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { DayGrid } from './DayGrid';

interface CalendarViewProps {
  calendar: ReturnType<typeof useCalendar>;
}

const monthFlipVariants = {
  enter: (direction: number) => ({
    rotateX: direction > 0 ? -90 : 90,
    y: direction > 0 ? -100 : 100,
    opacity: 0,
    z: -500,
    filter: 'blur(10px)'
  }),
  center: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    z: 0,
    filter: 'blur(0px)'
  },
  exit: (direction: number) => ({
    rotateX: direction > 0 ? 90 : -90,
    y: direction > 0 ? 100 : -100,
    opacity: 0,
    z: -500,
    filter: 'blur(10px)'
  })
};

export function CalendarView({ calendar }: CalendarViewProps) {
  const monthKey = `${calendar.currentMonth.getFullYear()}-${calendar.currentMonth.getMonth()}`;

  return (
    <div className="flex flex-col w-full relative bg-[#111114]">
      {/* Premium Spiral Binding Visual */}
      <div className="w-full h-10 flex justify-around px-8 pointer-events-none sticky top-0 z-30 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[3px] h-6 bg-gradient-to-b from-[#222] via-[#555] to-[#222] rounded-full shadow-lg" />
            <div className="w-[8px] h-[3px] bg-[#111] mt-[-1px] rounded-full" />
          </div>
        ))}
      </div>

      <div className="px-8 md:px-12 pt-4 w-full">
        <Header
          currentMonth={calendar.currentMonth}
          onPrevMonth={calendar.prevMonth}
          onNextMonth={calendar.nextMonth}
        />
      </div>

      <div className="px-8 md:px-12 pb-10 w-full mt-6" style={{ perspective: '2500px' }}>
        <div className="relative min-h-[30rem]">
          <AnimatePresence mode="wait" initial={false} custom={calendar.monthDirection}>
            <motion.div
              key={monthKey}
              custom={calendar.monthDirection}
              variants={monthFlipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.4 }
              }}
              style={{
                transformOrigin: calendar.monthDirection > 0 ? '50% 0%' : '50% 100%',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
              className="absolute inset-0 z-10"
            >
              <DayGrid
                days={calendar.days}
                onDayClick={calendar.handleDayClick}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle bottom shadow/depth for the 'wall' feel */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />
    </div>
  );
}
