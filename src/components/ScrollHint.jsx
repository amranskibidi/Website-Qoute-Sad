'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setVisible(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ delay: 3, duration: 1.5, ease: 'easeInOut' }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span
            className="text-[0.65rem] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(120, 145, 180, 0.4)' }}
          >
            scroll perlahan
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '28px',
              background: 'linear-gradient(to bottom, rgba(120,145,180,0.35), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
