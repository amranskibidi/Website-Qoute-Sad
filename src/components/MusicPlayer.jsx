'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ src = '/musik.mp3' }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!started) {
        setStarted(true);
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0.12;
          audio.play().catch(() => {});
          setPlaying(true);
          setShowToggle(true);
        }
      }
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [started]);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <AnimatePresence>
        {showToggle && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            onClick={toggle}
            className="fixed bottom-8 right-8 z-30 flex items-center gap-2 group"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {/* Sound wave bars */}
            <div className="flex items-end gap-[2px] h-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    playing
                      ? {
                          scaleY: [0.4, 1, 0.4],
                          transition: {
                            repeat: Infinity,
                            duration: 0.9 + i * 0.15,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          },
                        }
                      : { scaleY: 0.3 }
                  }
                  style={{
                    display: 'block',
                    width: '2px',
                    height: '14px',
                    originY: 1,
                    background: playing
                      ? 'rgba(130, 165, 210, 0.5)'
                      : 'rgba(130, 165, 210, 0.2)',
                    borderRadius: '1px',
                    transition: 'background 0.4s',
                  }}
                />
              ))}
            </div>
            <span
              className="text-[0.58rem] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(110, 140, 180, 0.4)' }}
            >
              {playing ? 'music' : 'paused'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
