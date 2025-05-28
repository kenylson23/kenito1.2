import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function HistorySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section id="historia" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-black via-green-900/20 to-black opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-8">
              NOSSA <span className="text-gradient">HISTÓRIA</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A <span className="text-green-400 font-semibold">Kenito</span> nasceu do sonho de criar 
                uma cerveja que representasse verdadeiramente o espírito angolano. 
                Combinando técnicas tradicionais de produção com ingredientes locais premium.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Nossa fábrica em <span className="text-green-300 font-semibold">Luanda</span> 
                emprega mais de 200 angolanos, contribuindo para o desenvolvimento 
                da indústria cervejeira nacional e criando oportunidades de emprego.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Cada lata de Kenito carrega consigo a <span className="text-yellow-400 font-semibold">
                paixão e dedicação</span> de nossa equipe, que trabalha incansavelmente 
                para entregar a melhor experiência cervejeira de Angola.
              </motion.p>
            </div>
            
            <motion.button
              className="mt-8 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conheça Nossa Fábrica
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Cultura angolana"
              className="rounded-xl shadow-2xl w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
