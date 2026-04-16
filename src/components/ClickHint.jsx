'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClickHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handle = () => setVisible(false);
    window.addEventListener('click', handle, { once: true });
    return () => window.removeEventListener('click', handle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ delay: 1.5, duration: 1.8, ease: 'easeInOut' }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="text-[0.62rem] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(120, 145, 180, 0.55)' }}
          >
            klik di mana saja
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
