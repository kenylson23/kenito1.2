import { motion } from "framer-motion";
import Can3D from "./can-3d";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { ref: heroRef } = useScrollReveal();

  const scrollToProduct = () => {
    const element = document.getElementById("produto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen hero-gradient relative overflow-hidden flex items-center justify-center"
    >
      <div className="geometric-pattern absolute inset-0 opacity-30"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, -100],
              scale: [0, 1, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10" ref={heroRef}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-orbitron text-5xl md:text-7xl font-black leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">NOVA BEBIDA</span>
              <br />
              <span className="text-white">SABOR</span>
              <br />
              <span className="text-green-400">INTENSO</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A cerveja premium que representa o espírito angolano. 
              Criada para os que apreciam sabor autêntico e qualidade superior.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="glow-effect bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProduct}
              >
                Experimentar Agora
              </motion.button>
              <motion.button
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold py-4 px-8 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProduct}
              >
                Saber Mais
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* 3D Can */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Can3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToProduct}
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </motion.div>
    </section>
  );
}
