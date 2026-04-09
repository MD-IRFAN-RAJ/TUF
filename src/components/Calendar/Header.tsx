import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

interface HeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function Header({ currentMonth, onPrevMonth, onNextMonth }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="relative overflow-hidden h-12 w-64">
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={currentMonth.toISOString()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-black tracking-tight text-white uppercase absolute"
          >
            {format(currentMonth, 'MMMM yyyy')}
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onPrevMonth}
          className="w-10 h-10 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onNextMonth}
          className="w-10 h-10 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
}
