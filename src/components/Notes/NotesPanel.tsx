import { format } from 'date-fns';
import { useNotes } from '../../hooks/useNotes';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface NotesPanelProps {
  selectionStart: Date | null;
  selectionEnd: Date | null;
}

export function NotesPanel({ selectionStart, selectionEnd }: NotesPanelProps) {
  const rangeKey = selectionStart && selectionEnd 
    ? `${format(selectionStart, 'yyyyMMdd')}-${format(selectionEnd, 'yyyyMMdd')}`
    : selectionStart 
    ? format(selectionStart, 'yyyyMMdd')
    : 'general';

  const { notes, setNotes } = useNotes(rangeKey);

  const getTitle = () => {
    if (selectionStart && selectionEnd) {
      return `${format(selectionStart, 'MMM d')} - ${format(selectionEnd, 'MMM d')}`;
    }
    if (selectionStart) {
      return format(selectionStart, 'MMMM d, yyyy');
    }
    return 'General Notes';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#111114] rounded-[2.5rem] p-8 flex flex-col gap-8 h-full premium-shadow border border-white/5 relative overflow-hidden group min-h-[400px]"
    >
      {/* Background paper texture effect */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none paper-texture" />

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3 text-white/40">
          <Sparkles size={18} className="text-primary" />
          <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase">Scribbles & Plans</h3>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold px-3 py-0.5 tracking-wider">
          ACTIVE DRAFT
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-6 z-10">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <CalendarIcon size={20} className="text-white/20" />
          <AnimatePresence mode="wait">
            <motion.span
              key={rangeKey}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {getTitle()}
            </motion.span>
          </AnimatePresence>
        </div>

        <ScrollArea className="flex-1 relative group pr-4">
          {/* Ruled Lines Background */}
          <div className="absolute inset-0 pointer-events-none flex flex-col gap-10 pt-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-b border-white/5 w-full h-px" />
            ))}
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Your hand-written notes go here..."
            className="w-full h-full min-h-[350px] bg-transparent resize-none focus:outline-none text-white/80 text-base leading-[2.52rem] placeholder:text-white/10 relative z-10 py-1"
          />
        </ScrollArea>
      </div>

      <div className="pt-6 border-t border-white/5 z-10 flex justify-between items-center">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">
          {notes.length > 0 ? "Synced with local storage" : "No entries yet"}
        </p>
        {notes.length > 0 && (
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3b82f6]" />
        )}
      </div>
    </motion.div>
  );
}
