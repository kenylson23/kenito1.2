import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to an API
    toast({
      title: "Mensagem Enviada!",
      description: "Entraremos em contacto em breve.",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-20 bg-black relative">
      <div className="geometric-pattern absolute inset-0 opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gradient">CONTACTE-NOS</span>
          </h2>
          <p className="text-xl text-gray-300">Entre em contacto connosco</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-300 mb-6">Informações de Contacto</h3>
              
              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-green-300 font-semibold">Endereço</div>
                    <div className="text-gray-300">Luanda, Angola<br />Zona Industrial</div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-green-300 font-semibold">Telefone</div>
                    <div className="text-gray-300">+244 949639932</div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-green-300 font-semibold">Email</div>
                    <div className="text-gray-300">info@kenito.ao</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-300 mb-6">Redes Sociais</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" }
                ].map((social) => (
                  <motion.button
                    key={social.label}
                    className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center hover:bg-green-500/40 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6 text-green-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-300 mb-6">Envie uma Mensagem</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-green-300 font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-green-300 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-green-300 font-medium mb-2">Mensagem</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none transition-colors"
                    placeholder="Como podemos ajudar?"
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="w-full glow-effect bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar Mensagem
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
