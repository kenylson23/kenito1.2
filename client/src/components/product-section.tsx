import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Award, Flame, MapPin } from "lucide-react";

export default function ProductSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const features = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Ingredientes cuidadosamente selecionados e processo de produção rigoroso garantem o sabor único da Kenito."
    },
    {
      icon: Flame,
      title: "Sabor Intenso",
      description: "Uma experiência sensorial única que combina tradição angolana com técnicas modernas de produção."
    },
    {
      icon: MapPin,
      title: "Orgulho Angolano",
      description: "Produzida em Angola, para Angola e para o mundo. Carregamos a nossa identidade em cada gole."
    }
  ];

  return (
    <section id="produto" className="py-20 bg-gray-900 relative">
      <div className="geometric-pattern absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-6">
            O <span className="text-gradient">PRODUTO</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cerveja premium produzida com ingredientes selecionados e o carinho de Angola
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.2)"
              }}
            >
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="text-green-400 text-2xl" size={32} />
                </motion.div>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-green-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: "200+", label: "Colaboradores" },
            { number: "1M+", label: "Latas Vendidas" },
            { number: "18", label: "Províncias" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl md:text-4xl font-black text-green-400 font-orbitron">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
