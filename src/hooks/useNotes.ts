import { useState, useEffect } from 'react';

export function useNotes(rangeKey: string = 'general') {
  const [notes, setNotes] = useState<string>(() => {
    const allNotes = JSON.parse(localStorage.getItem('calendar_range_notes') || '{}');
    return allNotes[rangeKey] || '';
  });

  useEffect(() => {
    // When rangeKey changes, sync with local storage
    const allNotes = JSON.parse(localStorage.getItem('calendar_range_notes') || '{}');
    setNotes(allNotes[rangeKey] || '');
  }, [rangeKey]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const allNotes = JSON.parse(localStorage.getItem('calendar_range_notes') || '{}');
      allNotes[rangeKey] = notes;
      localStorage.setItem('calendar_range_notes', JSON.stringify(allNotes));
    }, 500); // debounce save
    return () => clearTimeout(timeoutId);
  }, [notes, rangeKey]);

  return { notes, setNotes };
}
