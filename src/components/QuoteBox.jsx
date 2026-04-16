'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    text: "Kita tidak pernah benar-benar tahu betapa berharganya seseorang… sampai dia pergi.",
    author: "— Thomas Fuller",
  },
  {
    text: "Menyedihkan rasanya ketika seseorang yang dulu kita kenal… berubah jadi seseorang yang hanya pernah kita kenal.",
    author: "— Henry Rollins",
  },
  {
    text: "Bukan dunia yang berubah… hanya saja satu orang itu sudah tidak ada lagi di dalamnya.",
    author: "— Uknown",
  },
  {
    text: "yang paling menyakitkan bukan kehilangan itu sendiri — tapi pagi-pagi setelahnya, saat kamu lupa sejenak, lalu ingat lagi.",
    author: "— setelah tidur",
  },
  {
    text: "Yang paling berat bukan melupakan… tapi menerima bahwa kenangan itu tidak akan pernah terulang.",
    author: "— Amran",
  },
  {
    text: "Kehilangan terbesar adalah saat kita masih ingin bercerita… tapi sudah tidak tahu harus pulang ke siapa.",
    author: "— Uknown",
  },
  {
    text: "ada versi dari kamu yang belum kamu kenalkan ke siapa pun — yang duduk sendiri di sudut paling sunyi dari hidupmu.",
    author: "— di balik senyum",
  },
  {
    text: "jarak bukan soal mil. ada orang yang duduk di sebelahmu, tapi sudah jauh sejak lama.",
    author: "— kekosongan yang hangat",
  },
];

export default function QuoteBox() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true);
      }, 900);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl mx-auto"
          >
            <motion.p
              className="text-[1.05rem] md:text-[1.2rem] leading-[1.95] font-light tracking-wide"
              style={{
                color: 'rgba(200, 215, 235, 0.88)',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
              }}
            >
              {quote.text}
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="block mt-6 text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(130, 155, 190, 0.5)' }}
            >
              {quote.author}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 2, ease: 'easeInOut' }}
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1px',
          height: '60px',
          marginTop: '-120px',
          background: 'linear-gradient(to bottom, transparent, rgba(130,160,210,0.25), transparent)',
        }}
      />
    </div>
  );
}
