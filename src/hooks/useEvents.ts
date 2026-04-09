import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';

export interface CalendarEvent {
  id: string;
  title: string;
  dateKey: string;
  createdAt: string;
}

type EventsByDate = Record<string, CalendarEvent[]>;

const STORAGE_KEY = 'calendar_events';

function createEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function toDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function useEvents() {
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw) as EventsByDate;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventsByDate));
  }, [eventsByDate]);

  const addEvent = (date: Date, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    const dateKey = toDateKey(date);
    const newEvent: CalendarEvent = {
      id: createEventId(),
      title: trimmed,
      dateKey,
      createdAt: new Date().toISOString(),
    };

    setEventsByDate((prev) => {
      const existing = prev[dateKey] ?? [];
      return {
        ...prev,
        [dateKey]: [newEvent, ...existing],
      };
    });
  };

  const removeEvent = (dateKey: string, id: string) => {
    setEventsByDate((prev) => {
      const nextEvents = (prev[dateKey] ?? []).filter((item) => item.id !== id);

      if (nextEvents.length === 0) {
        const { [dateKey]: _removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [dateKey]: nextEvents,
      };
    });
  };

  const getEventsForDate = (date: Date) => {
    return eventsByDate[toDateKey(date)] ?? [];
  };

  const eventDateKeys = useMemo(() => {
    return new Set(
      Object.entries(eventsByDate)
        .filter(([, events]) => events.length > 0)
        .map(([dateKey]) => dateKey)
    );
  }, [eventsByDate]);

  return {
    eventsByDate,
    addEvent,
    removeEvent,
    getEventsForDate,
    eventDateKeys,
  };
}
