import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HeroSection } from './components/Layout/HeroSection';
import { CalendarView } from './components/Calendar/CalendarView';
import { NotesPanel } from './components/Notes/NotesPanel';
import { EventPanel } from './components/Events/EventPanel';
import { Search, Plus, CalendarDays, List, Sparkles, Settings, Bell, User } from 'lucide-react';
import { cn } from './utils/cn';
import { useCalendar } from './hooks/useCalendar';
import { useEvents } from './hooks/useEvents';
import { format } from 'date-fns';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'calendar' | 'events' | 'notes' | 'settings';

function ComingSoon({ view }: { view: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Sparkles className="text-primary w-12 h-12 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold mb-2 capitalize">{view} View</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        We're working hard to bring you the best {view} experience. Check back soon for updates!
      </p>
      <Badge variant="outline" className="mt-6 px-4 py-1 border-primary/30 text-primary">Beta v0.1</Badge>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300 group relative py-2 px-4 rounded-2xl",
        active ? "text-primary bg-primary/5" : "text-slate-400 hover:text-slate-200"
      )}
    >
      <Icon size={22} className={cn("transition-transform group-hover:scale-110", active && "scale-110")} />
      <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_#3b82f6]"
        />
      )}
    </button>
  );
}

function MainLayout() {
  const events = useEvents();
  const calendar = useCalendar(events.eventDateKeys);
  const [activeView, setActiveView] = useState<ViewType>('calendar');
  
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f8fafc] flex flex-col font-sans selection:bg-primary/30 selection:text-white pb-32 lg:pb-0">
      
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 glass flex justify-between items-center px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-6">
          <button className="text-white/60 hover:text-white transition-colors">
            <List size={22} />
          </button>
          <div className="flex items-center gap-4">
            <h1 className="font-chronos text-xl text-white flex items-center gap-3">
              <span className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                {format(calendar.currentMonth, 'MMMM')}
              </span>
              <span className="opacity-40">CHRONOS</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white rounded-full">
            <Bell size={20} />
          </Button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 p-[1px]">
            <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
              <User size={20} className="text-white/80" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-24 px-4 w-full flex justify-center relative overflow-hidden">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-900/5 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-6xl z-10 relative">
          <AnimatePresence mode="wait">
            {activeView === 'calendar' ? (
              <motion.div 
                key="calendar-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-4"
              >
                {/* Left Column: The Physical Calendar */}
                <div className="col-span-1 lg:col-span-8 flex flex-col items-center">
                  <div className="w-full bg-[#111114] rounded-[2.5rem] premium-shadow overflow-hidden flex flex-col border border-white/5 relative group">
                    {/* Hanging Hook Visual */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none opacity-40">
                      <div className="w-4 h-4 rounded-full bg-[#1e1e24] shadow-inner ring-4 ring-[#0a0a0c]" />
                    </div>

                    <HeroSection month={format(calendar.currentMonth, 'MMMM')} year={format(calendar.currentMonth, 'yyyy')} />
                    <CalendarView calendar={calendar} />
                  </div>
                </div>

                {/* Right Column: Interaction & Notes */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-8 h-full">
                  <div className="lg:sticky lg:top-28 flex flex-col gap-8">
                    <NotesPanel 
                      selectionStart={calendar.selectionStart} 
                      selectionEnd={calendar.selectionEnd} 
                    />

                    <EventPanel
                      selectedDate={calendar.selectionStart}
                      events={calendar.selectionStart ? events.getEventsForDate(calendar.selectionStart) : []}
                      onAddEvent={events.addEvent}
                      onDeleteEvent={events.removeEvent}
                    />
                  </div>
                </div>
              </motion.div>
            ) : activeView === 'events' ? (
              <motion.div
                key="events-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-6"
              >
                <div className="w-full max-w-xl mx-auto">
                  <EventPanel
                    selectedDate={calendar.selectionStart}
                    events={calendar.selectionStart ? events.getEventsForDate(calendar.selectionStart) : events.getEventsForDate(new Date())}
                    onAddEvent={events.addEvent}
                    onDeleteEvent={events.removeEvent}
                  />
                </div>
              </motion.div>
            ) : (
              <ComingSoon view={activeView} />
            )}
          </AnimatePresence>
        </div>

        {/* FAB for Mobile */}
        <Button className="fixed bottom-28 right-6 w-16 h-16 rounded-full premium-gradient shadow-2xl shadow-primary/40 lg:hidden z-40">
          <Plus size={32} />
        </Button>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-[2.5rem] flex px-8 py-3 shadow-2xl border-white/10 z-50 min-w-[340px] justify-between">
        <NavItem icon={CalendarDays} label="Calendar" active={activeView === 'calendar'} onClick={() => setActiveView('calendar')} />
        <NavItem icon={Plus} label="Events" active={activeView === 'events'} onClick={() => setActiveView('events')} />
        <NavItem icon={Search} label="Notes" active={activeView === 'notes'} onClick={() => setActiveView('notes')} />
        <NavItem icon={Settings} label="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
      </nav>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
