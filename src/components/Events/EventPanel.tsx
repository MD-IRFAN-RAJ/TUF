import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { CalendarPlus, Trash2 } from 'lucide-react';
import type { CalendarEvent } from '../../hooks/useEvents';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface EventPanelProps {
  selectedDate: Date | null;
  events: CalendarEvent[];
  onAddEvent: (date: Date, title: string) => void;
  onDeleteEvent: (dateKey: string, id: string) => void;
}

export function EventPanel({ selectedDate, events, onAddEvent, onDeleteEvent }: EventPanelProps) {
  const [title, setTitle] = useState('');

  const targetDate = useMemo(() => selectedDate ?? new Date(), [selectedDate]);
  const dateKey = format(targetDate, 'yyyy-MM-dd');

  const handleAdd = () => {
    if (!title.trim()) {
      return;
    }

    onAddEvent(targetDate, title);
    setTitle('');
  };

  return (
    <div className="bg-[#111114] rounded-[2rem] p-6 flex flex-col gap-5 border border-white/5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">Events</p>
          <h4 className="text-white font-semibold mt-1">{format(targetDate, 'EEEE, MMM d')}</h4>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary">
          {events.length} items
        </Badge>
      </div>

      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
          placeholder="Add an event title"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <Button onClick={handleAdd} className="premium-gradient">
          <CalendarPlus size={16} />
          Add
        </Button>
      </div>

      <div className="max-h-48 overflow-auto custom-scrollbar pr-1">
        {events.length === 0 ? (
          <p className="text-sm text-white/40">No events yet for this date.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                <p className="text-sm text-white/90 truncate pr-2">{event.title}</p>
                <button
                  type="button"
                  aria-label={`Delete ${event.title}`}
                  onClick={() => onDeleteEvent(dateKey, event.id)}
                  className="text-red-300 hover:text-red-200 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
