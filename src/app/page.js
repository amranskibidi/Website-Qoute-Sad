'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RainCanvas from '@/components/RainCanvas';
import QuoteBox from '@/components/QuoteBox';
import ScrollHint from '@/components/ScrollHint';
import ClickHint from '@/components/ClickHint';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Raleway:wght@100;200;300&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #07090f;
          color: rgba(200, 215, 235, 0.85);
          font-family: 'Raleway', sans-serif;
          overflow-x: hidden;
        }

        /* Tekstur grain agar terasa seperti film anime lama */
        .film-grain {
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.03;
          z-index: 5;
          pointer-events: none;
          animation: noise 0.2s infinite;
        }
        @keyframes noise {
          0% { transform: translate(0,0) }
          10% { transform: translate(-1%,-1%) }
          20% { transform: translate(1%,1%) }
          30% { transform: translate(-2%,1%) }
        }
      `}</style>

      <main
        style={{
          minHeight: '100vh',
          position: 'relative',
          background: '#07090f',
        }}
      >
        {}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: 'url(/bg-anime.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        {}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 0%, #07090f 90%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div className="film-grain" />

        {}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <RainCanvas />
          <ClickHint />
          <ScrollHint />
          <MusicPlayer src="/musik.mp3" />
        </div>

        {}
        <section style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 2.5 }}
            style={{
              position: 'absolute',
              top: '3rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.5em', color: 'rgba(100, 130, 170, 0.4)' }}>
              DALAM KEHENINGAN
            </span>
          </motion.div>

          {}
          <QuoteBox />
        </section>

        {}
        <footer style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingBottom: '3rem' }}>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', color: 'rgba(100, 125, 165, 0.3)' }}>
            DIBUAT OLEH AMRAN
          </span>
        </footer>
      </main>
    </>
  );
}
