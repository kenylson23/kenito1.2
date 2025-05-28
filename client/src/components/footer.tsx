import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900/40 border-t border-green-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="font-orbitron text-3xl font-bold text-green-400 mb-4">KENITO</div>
            <p className="text-gray-400">
              A cerveja premium de Angola. 
              Sabor autêntico, qualidade superior.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-green-300 font-semibold mb-4">Links Rápidos</h4>
            <div className="space-y-2">
              {[
                { label: "Início", id: "home" },
                { label: "Produto", id: "produto" },
                { label: "História", id: "historia" },
                { label: "Contacto", id: "contato" }
              ].map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-400 hover:text-green-400 transition-colors text-left"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-green-300 font-semibold mb-4">Informações</h4>
            <div className="space-y-2 text-gray-400">
              <p>Luanda, Angola</p>
              <p>+244 949639932</p>
              <p>info@kenito.ao</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="border-t border-green-500/20 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Kenylson Lourenço. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Beba com responsabilidade. Venda proibida para menores de 18 anos.</p>
        </motion.div>
      </div>
    </footer>
  );
}
