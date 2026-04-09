import { motion } from 'framer-motion';

interface HeroSectionProps {
  month: string;
  year: string;
}

const monthImages: Record<string, string> = {
  'January': 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=2670&auto=format&fit=crop',
  'February': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2670&auto=format&fit=crop',
  'March': 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=2670&auto=format&fit=crop',
  'April': 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=2670&auto=format&fit=crop',
  'Default': 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2670&auto=format&fit=crop'
};

export function HeroSection({ month, year }: HeroSectionProps) {
  const imageUrl = monthImages[month] || monthImages['Default'];
  
  return (
    <div className="relative h-72 lg:h-80 w-full overflow-hidden">
      <motion.img 
        key={imageUrl}
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        alt="Month Atmosphere" 
        className="w-full h-full object-cover"
        src={imageUrl} 
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3 }}
        >
          <span className="text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
            {month === 'January' ? '01' : 
             month === 'February' ? '02' : 
             month === 'March' ? '03' : 
             month === 'April' ? '04' : '01'}
          </span>
          <div className="w-12 h-1 bg-primary mt-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        </motion.div>
        
        <div className="mt-4">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/80"
          >
            {month} Solstice Series — {year}
          </motion.h3>
        </div>
      </div>

      {/* Ribbon Detail */}
      <div className="absolute top-0 right-10 w-16 h-20 bg-primary/20 backdrop-blur-md rounded-b-xl border border-white/10 flex flex-col items-center justify-center p-2 z-20">
        <div className="w-1 h-3 bg-white/40 rounded-full mb-2" />
        <span className="text-[8px] font-bold text-white/60 tracking-widest text-center leading-tight">LIMITED EDITION</span>
      </div>
    </div>
  );
}
