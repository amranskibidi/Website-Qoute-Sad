"use client";

import { useEffect, useRef } from "react";

export default function RainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const drops = Array.from({ length: 350 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 2.5,
      length: 20 + Math.random() * 30,
      opacity: 0.15 + Math.random() * 0.25,
    }));

    let lightning = false;
    let lightningAlpha = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🌧️ hujan
      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.2, drop.y + drop.length);
        ctx.strokeStyle = `rgba(180, 200, 255, ${drop.opacity})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * 0.2;

        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      // ⚡ PETIR (flash)
      if (Math.random() < 0.002) {
        lightning = true;
        lightningAlpha = 0.8;
      }

      if (lightning) {
        ctx.fillStyle = `rgba(255,255,255,${lightningAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        lightningAlpha -= 0.05;
        if (lightningAlpha <= 0) {
          lightning = false;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9, filter: "blur(0.3px)" }}
    />
  );
}