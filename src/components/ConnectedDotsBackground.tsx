import { useEffect, useRef } from 'react';

export default function ConnectedDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 60; // Clean, high-performance count so it looks spacious and elegant

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
        initParticles();
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }

    const tonesOfBlue = [
      'rgba(37, 99, 235, 0.3)',   // Royal Blue
      'rgba(59, 130, 246, 0.4)',  // Blue-500
      'rgba(96, 165, 250, 0.35)', // Blue-400
      'rgba(147, 197, 253, 0.25)', // Blue-300
    ];

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, // Slow, elegant movement
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1.5, // Crisp high-definition dots
          color: tonesOfBlue[Math.floor(Math.random() * tonesOfBlue.length)],
        });
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce screen edge
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();

        // Connected lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If close enough, draw connection line with alpha fading
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12; // Beautiful subtle connections
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      id="connected-dots-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
