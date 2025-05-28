import { useState, useRef } from "react";
import { motion } from "framer-motion";
import kenitoCanImage from "@assets/ChatGPT Image 28_05_2025, 21_04_51.png";

export default function Can3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const canRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canRef.current) return;

    const rect = canRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newRotateX = (y - centerY) / 10;
    const newRotateY = (centerX - x) / 10;
    
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative">
      {/* Glow effect background */}
      <motion.div
        className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main can container */}
      <motion.div
        ref={canRef}
        className="can-3d relative z-10 cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Kenito beer can image */}
        <motion.img
          src={kenitoCanImage}
          alt="Kenito Cerveja Premium"
          className="relative z-10 max-w-sm mx-auto drop-shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Reflection effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-green-400/10 to-transparent rounded-full blur-sm"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles around the can */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full"
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            x: [0, Math.sin(i) * 10, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i * 0.2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
